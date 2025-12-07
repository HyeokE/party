/**
 * Google Apps Script for Party Registration
 *
 * 이 스크립트는 두 개의 엔드포인트를 제공합니다:
 * 1. doPost: 신청 데이터 저장
 * 2. doGet: 중복 신청 체크
 */

const SHEET_NAME = 'Submissions'; // 시트 이름

/**
 * OPTIONS 요청 핸들러 - CORS preflight 처리
 * 브라우저가 preflight 요청을 보낼 때 CORS 헤더를 명시적으로 설정합니다.
 */
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * POST 요청 핸들러 - 신청 데이터 저장 또는 업데이트
 */
function doPost(e) {
  try {
    let data;
    
    // 디버깅을 위한 로깅
    Logger.log('doPost 호출됨');
    Logger.log('e.parameter: ' + JSON.stringify(e.parameter));
    if (e.postData) {
      Logger.log('e.postData.type: ' + e.postData.type);
      Logger.log('e.postData.contents (처음 200자): ' + (e.postData.contents ? e.postData.contents.substring(0, 200) : 'null'));
    }
    
    // 1. e.parameter.data를 먼저 확인 (URLSearchParams로 보낸 경우 Google Apps Script가 자동 파싱)
    if (e.parameter && e.parameter.data) {
      Logger.log('e.parameter.data 사용 (URLSearchParams 자동 파싱)');
      try {
        data = JSON.parse(e.parameter.data);
        Logger.log('데이터 파싱 성공: ' + JSON.stringify(data));
      } catch (parseError) {
        Logger.log('e.parameter.data 파싱 실패: ' + parseError.toString());
        throw new Error('Failed to parse data parameter: ' + parseError.toString() + 
                       '. Data: ' + String(e.parameter.data).substring(0, 100));
      }
    }
    // 2. e.postData.contents가 있는 경우 (JSON으로 직접 전송하거나 URLSearchParams 원본)
    else if (e.postData && e.postData.contents) {
      const contents = e.postData.contents.trim();
      Logger.log('e.postData.contents 확인: ' + contents.substring(0, 200));
      
      // JSON 형식인지 확인 (중괄호로 시작)
      if (contents.startsWith('{') || contents.startsWith('[')) {
        Logger.log('JSON 형식 감지');
        try {
          data = JSON.parse(contents);
          Logger.log('JSON 파싱 성공: ' + JSON.stringify(data));
        } catch (parseError) {
          Logger.log('JSON 파싱 실패: ' + parseError.toString());
          throw new Error('Failed to parse JSON: ' + parseError.toString());
        }
      }
      // URLSearchParams 형식 (하위 호환성을 위해 유지)
      else if (contents.indexOf('data=') >= 0) {
        Logger.log('URLSearchParams 형식 감지 - 수동 파싱 시작');
        try {
          const dataMatch = contents.match(/data=([^&]*)/);
          if (dataMatch && dataMatch[1]) {
            const decodedData = decodeURIComponent(dataMatch[1]);
            data = JSON.parse(decodedData);
            Logger.log('URLSearchParams 수동 파싱 성공');
          } else {
            throw new Error('URLSearchParams에서 data 파라미터를 찾을 수 없습니다');
          }
        } catch (parseError) {
          Logger.log('URLSearchParams 파싱 실패: ' + parseError.toString());
          throw new Error('Failed to parse URLSearchParams: ' + parseError.toString());
        }
      } else {
        Logger.log('알 수 없는 형식: ' + contents.substring(0, 100));
        throw new Error('postData.contents 형식을 인식할 수 없습니다: ' + contents.substring(0, 100));
      }
    }
    // 3. 직접 파라미터로 전달된 경우
    else if (e.parameter) {
      Logger.log('직접 파라미터 사용');
      const params = e.parameter;
      data = {
        timestamp: params.timestamp || new Date().toISOString(),
        name: params.name || '',
        phone: params.phone || '',
        email: params.email || '',
        type: params.type || 'join',
        accountConfirmed: params.accountConfirmed === 'true' || false
      };
    } else {
      Logger.log('데이터 없음');
      throw new Error('No data provided');
    }
    
    // 데이터 유효성 검사
    if (!data || (!data.email && !data.phone)) {
      throw new Error('Invalid data: email or phone is required');
    }
    
    const sheet = getOrCreateSheet();
    const allData = sheet.getDataRange().getValues();

    // 기존 데이터 찾기 (이메일과 전화번호로 검색)
    let existingRowIndex = -1;
    for (let i = 1; i < allData.length; i++) {
      const row = allData[i];
      const rowEmail = String(row[3] || '').trim(); // email 컬럼
      const rowPhone = String(row[2] || '').trim(); // phone 컬럼
      const dataEmail = String(data.email || '').trim();
      const dataPhone = String(data.phone || '').trim();

      // 이메일 또는 전화번호가 일치하면
      if ((dataEmail && rowEmail === dataEmail) || (dataPhone && rowPhone === dataPhone)) {
        existingRowIndex = i + 1; // 시트 행 번호는 1부터 시작
        break;
      }
    }

    if (existingRowIndex > 0) {
      // 기존 데이터 업데이트 (accountConfirmed만 업데이트)
      const accountConfirmed = data.accountConfirmed || false;
      sheet.getRange(existingRowIndex, 6).setValue(accountConfirmed); // Account Confirmed 컬럼 업데이트
      
      return createCorsResponse(
        JSON.stringify({ success: true, updated: true })
      );
    } else {
      // 새 데이터 저장
      sheet.appendRow([
        data.timestamp,
        data.name,
        data.phone,
        data.email,
        data.type,
        data.accountConfirmed || false
      ]);

      return createCorsResponse(
        JSON.stringify({ success: true, updated: false })
      );
    }

  } catch (error) {
    // 에러 로깅 (Google Apps Script 실행 로그에 기록됨)
    Logger.log('doPost 에러: ' + error.toString());
    Logger.log('요청 파라미터: ' + JSON.stringify(e.parameter));
    if (e.postData) {
      Logger.log('postData contents: ' + e.postData.contents);
    }
    
    return createCorsResponse(
      JSON.stringify({ success: false, error: error.toString() })
    );
  }
}

/**
 * GET 요청 핸들러 - 중복 신청 체크
 *
 * 쿼리 파라미터:
 * - email: 이메일 주소
 * - phone: 전화번호
 *
 * 응답:
 * {
 *   exists: boolean,
 *   type: 'join' | 'interest' | null,
 *   name: string | null
 * }
 */
function doGet(e) {
  try {
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';

    if (!email && !phone) {
      return createCorsResponse(
        JSON.stringify({
          exists: false,
          type: null,
          name: null
        })
      );
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();

    // 이메일과 전화번호 정규화 (공백 제거, 소문자 변환)
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPhone = String(phone || '').trim();

    // 헤더 제외하고 검색 (첫 번째 행은 헤더)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowEmail = String(row[3] || '').trim().toLowerCase(); // email 컬럼
      const rowPhone = String(row[2] || '').trim(); // phone 컬럼

      // 이메일 또는 전화번호가 일치하면 (하나라도 같으면 중복)
      if ((normalizedEmail && rowEmail === normalizedEmail) || 
          (normalizedPhone && rowPhone === normalizedPhone)) {
        return createCorsResponse(
          JSON.stringify({
            exists: true,
            type: row[4] || null, // type 컬럼
            name: row[1] || null  // name 컬럼
          })
        );
      }
    }

    // 일치하는 항목 없음
    return createCorsResponse(
      JSON.stringify({
        exists: false,
        type: null,
        name: null
      })
    );

  } catch (error) {
    return createCorsResponse(
      JSON.stringify({
        exists: false,
        type: null,
        name: null,
        error: error.toString()
      })
    );
  }
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // 헤더 추가
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Phone',
      'Email',
      'Type',
      'Account Confirmed'
    ]);

    // 헤더 스타일 설정
    const headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4ECDC4');
    headerRange.setFontColor('#FFFFFF');
  }

  return sheet;
}

/**
 * CORS 헤더가 포함된 JSON 응답 생성 헬퍼
 */
function createCorsResponse(content) {
  const output = ContentService.createTextOutput(content || '');
  output.setMimeType(ContentService.MimeType.JSON);
  
  // CORS 헤더 설정 (Google Apps Script는 직접 헤더를 설정할 수 없지만,
  // 웹앱으로 배포할 때 자동으로 처리됩니다)
  return output;
}

/**
 * JSON 응답 생성 헬퍼 (레거시 호환성)
 */
function createJsonResponse(data) {
  return createCorsResponse(JSON.stringify(data));
}

/**
 * 테스트용 함수
 */
function testDuplicateCheck() {
  const testEmail = 'test@example.com';
  const testPhone = '010-1234-5678';

  const e = {
    parameter: {
      email: testEmail,
      phone: testPhone
    }
  };

  const result = doGet(e);
  Logger.log(result.getContent());
}

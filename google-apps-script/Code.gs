/**
 * Google Apps Script for Party Registration
 *
 * 이 스크립트는 두 개의 엔드포인트를 제공합니다:
 * 1. doPost: 신청 데이터 저장
 * 2. doGet: 중복 신청 체크
 */

const SHEET_NAME = 'Submissions'; // 시트 이름

/**
 * POST 요청 핸들러 - 신청 데이터 저장
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    // 데이터 저장
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.email,
      data.type,
      data.accountConfirmed || false
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
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
      return createJsonResponse({
        exists: false,
        type: null,
        name: null
      });
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();

    // 헤더 제외하고 검색 (첫 번째 행은 헤더)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowEmail = row[3]; // email 컬럼
      const rowPhone = row[2]; // phone 컬럼

      // 이메일 또는 전화번호가 일치하면
      if ((email && rowEmail === email) || (phone && rowPhone === phone)) {
        return createJsonResponse({
          exists: true,
          type: row[4], // type 컬럼
          name: row[1]  // name 컬럼
        });
      }
    }

    // 일치하는 항목 없음
    return createJsonResponse({
      exists: false,
      type: null,
      name: null
    });

  } catch (error) {
    return createJsonResponse({
      exists: false,
      type: null,
      name: null,
      error: error.toString()
    });
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
 * JSON 응답 생성 헬퍼
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
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

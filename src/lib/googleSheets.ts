import type { UserData } from '../context/UserDataContext'

export interface SheetData extends UserData {
  timestamp: string
  type: 'join' | 'interest'
  accountConfirmed?: boolean
}

/**
 * Google Sheets에 데이터를 저장하는 함수
 * @param data 저장할 사용자 데이터
 * @param type 데이터 타입 ('join' | 'interest')
 * @param accountConfirmed 계좌 확인 여부 (선택사항)
 */
export async function saveToGoogleSheets(
  data: UserData,
  type: 'join' | 'interest',
  accountConfirmed?: boolean
): Promise<void> {
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL

  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL이 설정되지 않았습니다. 환경 변수 VITE_GOOGLE_SCRIPT_URL을 설정해주세요.')
    return
  }

  const sheetData: SheetData = {
    ...data,
    timestamp: new Date().toISOString(),
    type,
    accountConfirmed,
  }

  try {

    
    console.log('Google Sheets에 데이터 전송 시도:', { type, data: sheetData })
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      // Content-Type을 명시하지 않으면 브라우저가 자동으로 설정하고
      // simple request가 되어 preflight가 발생하지 않습니다
      body: JSON.stringify(sheetData),
      redirect: 'follow',
      credentials: 'omit',
    })

    // 응답 상태 코드 확인
    const status = response.status
    console.log('Google Sheets 응답 상태 코드:', status)
    
    if (status >= 400) {
      const errorText = await response.text().catch(() => '응답 읽기 실패')
      console.error('Google Sheets HTTP 에러:', { status, errorText })
      throw new Error(`HTTP error! status: ${status}, message: ${errorText}`)
    }

    // 응답 본문을 읽어서 실제 성공 여부 확인
    const responseText = await response.text()
    console.log('Google Sheets 응답 본문:', responseText)
    
    // JSON 형식인 경우 파싱하여 success 필드 확인
    if (responseText && responseText.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(responseText)
        console.log('Google Sheets 응답 파싱 결과:', parsed)
        
        if (parsed && typeof parsed === 'object') {
          // success가 false인 경우 에러 처리
          if (parsed.success === false) {
            console.error('Google Sheets 저장 실패:', parsed.error)
            throw new Error(parsed.error || '데이터 저장 실패')
          }
          // success가 true인 경우 성공
          if (parsed.success === true) {
            console.log('Google Sheets에 데이터 저장 완료:', parsed)
            return
          }
        }
      } catch (parseError) {
        // JSON 파싱 실패 시 에러가 아니면 성공으로 간주하지 않음
        if (parseError instanceof Error && parseError.message.includes('데이터 저장 실패')) {
          throw parseError
        }
        console.error('Google Sheets 응답 파싱 실패:', parseError, '원본 응답:', responseText)
        throw new Error('Google Sheets 응답 형식이 올바르지 않습니다')
      }
    } else {
      // 응답이 JSON이 아닌 경우
      console.warn('Google Sheets 응답이 JSON 형식이 아닙니다:', responseText)
      // 상태 코드가 200-399면 성공으로 간주 (하지만 경고)
      if (status >= 200 && status < 400) {
        console.warn('상태 코드만으로 성공으로 간주합니다. 실제 저장 여부를 확인해주세요.')
        return
      }
    }
    
    // 위의 모든 조건을 통과하지 못한 경우 실패로 처리
    throw new Error('Google Sheets에 데이터를 저장하지 못했습니다. 응답: ' + responseText)
  } catch (error) {
    console.error('Google Sheets 저장 실패:', error)
    // 에러를 다시 throw하여 호출하는 쪽에서 처리할 수 있도록 함
    throw error
  }
}


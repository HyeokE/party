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
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    })

    // no-cors 모드에서는 response를 읽을 수 없지만, 요청은 전송됩니다
    console.log('Google Sheets에 데이터 전송 완료')
  } catch (error) {
    console.error('Google Sheets 저장 실패:', error)
    // 사용자에게는 에러를 표시하지 않고 조용히 실패 처리
    // 필요시 에러 핸들링 로직 추가 가능
  }
}


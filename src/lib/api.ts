/**
 * Google Sheets API 서비스
 */

export interface DuplicateCheckResponse {
  exists: boolean
  type: 'join' | 'interest' | null
  name: string | null
}

/**
 * 중복 신청 확인
 * @param email 이메일
 * @param phone 전화번호
 * @returns 중복 여부 및 기존 신청 정보
 */
export async function checkDuplicateSubmission(
  email: string,
  phone: string
): Promise<DuplicateCheckResponse> {
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL

  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL not configured')
    return { exists: false, type: null, name: null }
  }

  try {
    // GET 요청으로 중복 체크
    const params = new URLSearchParams({
      email,
      phone
    })

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
      credentials: 'omit',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DuplicateCheckResponse = await response.json()
    return data

  } catch (error) {
    console.error('Failed to check duplicate submission:', error)
    // 에러 시 중복 없음으로 처리 (사용자 경험 우선)
    return { exists: false, type: null, name: null }
  }
}

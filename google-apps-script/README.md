# Google Apps Script 배포 가이드

이 스크립트는 파티 신청 데이터를 Google Sheets에 저장하고, 중복 신청을 확인하는 API를 제공합니다.

## 배포 방법

### 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 스프레드시트 이름: "Party Registrations" (원하는 이름)

### 2. Apps Script 설정

1. 스프레드시트에서 **확장 프로그램** → **Apps Script** 클릭
2. 기본 코드 삭제
3. `Code.gs` 파일의 전체 내용 복사하여 붙여넣기
4. 파일 저장 (Ctrl/Cmd + S)

### 3. 웹 앱으로 배포

1. Apps Script 편집기에서 **배포** → **새 배포** 클릭
2. 설정:
   - **유형 선택**: 웹 앱
   - **설명**: "Party Registration API v1" (원하는 설명)
   - **다음 계정으로 실행**: 나 (본인)
   - **액세스 권한**: **모든 사용자** (중요!)
3. **배포** 버튼 클릭
4. 권한 승인:
   - "액세스 권한 검토" 클릭
   - 본인의 Google 계정 선택
   - "고급" → "안전하지 않은 페이지로 이동" 클릭
   - "허용" 클릭
5. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/...../exec`)

### 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성 또는 수정:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

위에서 복사한 웹 앱 URL을 붙여넣으세요.

### 5. 시트 구조

스크립트가 자동으로 "Submissions" 시트를 생성하며, 다음과 같은 구조를 가집니다:

| Timestamp | Name | Phone | Email | Type | Account Confirmed |
|-----------|------|-------|-------|------|-------------------|
| 2025-01-15T10:30:00.000Z | 홍길동 | 010-1234-5678 | hong@example.com | join | false |

## API 엔드포인트

### POST - 데이터 저장

```javascript
fetch('YOUR_SCRIPT_URL', {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    timestamp: new Date().toISOString(),
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    type: 'join', // 'join' | 'interest'
    accountConfirmed: false
  })
})
```

### GET - 중복 확인

```javascript
const params = new URLSearchParams({
  email: 'hong@example.com',
  phone: '010-1234-5678'
})

fetch(`YOUR_SCRIPT_URL?${params.toString()}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    // {
    //   exists: true,
    //   type: 'join',
    //   name: '홍길동'
    // }
  })
```

## 보안 참고사항

- 중복 체크는 서버 사이드(Google Apps Script)에서 수행되므로 참여자 정보가 클라이언트에 노출되지 않습니다
- 이메일과 전화번호만 전송하고, 일치 여부와 타입만 반환합니다
- 민감한 정보는 Google Sheets에만 저장됩니다

## 테스트

Apps Script 편집기에서 `testDuplicateCheck` 함수를 실행하여 테스트할 수 있습니다:

1. 함수 선택: `testDuplicateCheck`
2. "실행" 버튼 클릭
3. "실행 로그" 확인

## 문제 해결

### "액세스가 거부되었습니다" 오류

- 배포 시 "모든 사용자"로 액세스 권한을 설정했는지 확인
- 새 배포를 생성하여 다시 시도

### 데이터가 저장되지 않음

- `VITE_GOOGLE_SCRIPT_URL` 환경 변수가 올바른지 확인
- 브라우저 개발자 도구의 Network 탭에서 요청 확인
- Apps Script의 "실행 로그"에서 에러 메시지 확인

### CORS 에러 해결 방법

#### 1. 웹앱 배포 설정 확인 (가장 중요!)

**배포 설정이 올바른지 확인:**

1. Apps Script 편집기에서 **배포** → **배포 관리** 클릭
2. 기존 배포 옆의 **연필 아이콘(편집)** 클릭
3. 다음 설정 확인:
   - **액세스 권한**: 반드시 **"모든 사용자"**로 설정되어 있어야 합니다
   - **다음 계정으로 실행**: **"나 (본인)"**으로 설정
4. **버전**: **"새 버전"** 선택
5. **배포** 버튼 클릭

⚠️ **중요**: "나와 내 조직"으로 설정하면 CORS 에러가 발생합니다!

#### 2. 스크립트 코드 확인

- `Code.gs` 파일에 `doOptions()` 함수가 포함되어 있는지 확인
- 이 함수는 CORS preflight 요청(OPTIONS)을 처리합니다

#### 3. 새 배포 버전 생성

코드를 수정한 후에는 반드시 **새 버전으로 배포**해야 변경사항이 적용됩니다:
- 배포 관리 → 편집 → 버전: "새 버전" 선택 → 배포

#### 4. 브라우저 캐시 클리어

- 개발자 도구 (F12) → Network 탭 → "Disable cache" 체크
- 또는 시크릿 모드에서 테스트

#### 5. 배포 URL 확인

웹앱 배포 URL이 올바른지 확인:
- URL 형식: `https://script.google.com/macros/s/SCRIPT_ID/exec`
- `/exec`로 끝나야 합니다 (다른 경로가 아닌)

#### 6. 권한 재승인

배포 설정을 변경한 경우 권한을 다시 승인해야 할 수 있습니다:
- 배포 관리 → 배포 URL 클릭 → 권한 승인

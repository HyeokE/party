# Google Sheets 연동 설정 가이드

이 가이드는 사용자가 입력한 데이터를 Google Sheets에 자동으로 저장하는 기능을 설정하는 방법을 설명합니다.

## 1. Google Sheets 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속하여 새 스프레드시트를 만듭니다.
2. 첫 번째 행에 다음 헤더를 입력합니다:
   ```
   타임스탬프 | 이름 | 전화번호 | 이메일 | 타입 | 계좌확인완료
   ```
3. 스프레드시트 이름을 적절히 설정합니다 (예: "파티 참여자 목록")

## 2. Google Apps Script 설정

1. 스프레드시트에서 **확장 프로그램** > **Apps Script**를 클릭합니다.
2. 기본 함수를 다음 코드로 교체합니다:

```javascript
function doPost(e) {
  try {
    // 스프레드시트 열기 (스크립트가 연결된 스프레드시트)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 요청 본문에서 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 타임스탬프 포맷팅 (한국 시간)
    const timestamp = new Date(data.timestamp);
    const formattedDate = Utilities.formatDate(
      timestamp,
      "Asia/Seoul",
      "yyyy-MM-dd HH:mm:ss"
    );
    
    // 행 추가
    const row = [
      formattedDate,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.type === 'join' ? '파티 참여' : '알림 신청',
      data.accountConfirmed ? '완료' : '대기'
    ];
    
    sheet.appendRow(row);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **저장** 버튼을 클릭하고 프로젝트 이름을 설정합니다 (예: "파티 데이터 수집").

## 3. 웹 앱으로 배포

1. Apps Script 편집기에서 **배포** > **새 배포**를 클릭합니다.
2. **유형 선택** 옆의 톱니바퀴 아이콘을 클릭하고 **웹 앱**을 선택합니다.
3. 다음 설정을 입력합니다:
   - **설명**: "파티 참여자 데이터 수집" (선택사항)
   - **실행 대상**: "나"
   - **액세스 권한**: "모든 사용자"
4. **배포** 버튼을 클릭합니다.
5. 권한 허용 팝업이 나타나면:
   - **권한 확인**을 클릭합니다.
   - Google 계정을 선택합니다.
   - **고급** > **안전하지 않은 페이지로 이동**을 클릭합니다 (처음 한 번만).
   - **허용**을 클릭합니다.
6. 배포가 완료되면 **웹 앱 URL**이 표시됩니다. 이 URL을 복사합니다.

## 4. 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일을 생성합니다 (이미 있다면 기존 파일에 추가):

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. `YOUR_SCRIPT_ID`를 위에서 복사한 웹 앱 URL의 ID로 교체합니다.
   - URL 형식: `https://script.google.com/macros/s/SCRIPT_ID/exec`
   - `SCRIPT_ID` 부분만 복사하여 `.env` 파일에 붙여넣습니다.

3. `.env` 파일을 `.gitignore`에 추가되어 있는지 확인합니다 (보안을 위해).

## 5. GitHub Pages 배포 시 환경 변수 설정

GitHub Pages는 빌드 타임에 환경 변수를 사용하므로, GitHub Actions 워크플로우를 수정해야 합니다:

1. GitHub 리포지토리에서 **Settings** > **Secrets and variables** > **Actions**로 이동합니다.
2. **New repository secret**을 클릭합니다.
3. 다음을 입력합니다:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Secret**: 위에서 복사한 전체 웹 앱 URL
4. **Add secret**을 클릭합니다.

5. `.github/workflows/deploy.yml` 파일의 빌드 단계를 수정합니다:

```yaml
- name: Build
  env:
    GITHUB_PAGES: true
    VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
  run: pnpm build
```

## 6. 테스트

1. 개발 서버를 실행합니다:
   ```bash
   pnpm dev
   ```

2. 폼을 제출하고 Google Sheets에서 데이터가 추가되었는지 확인합니다.

## 문제 해결

### 데이터가 저장되지 않는 경우

1. Apps Script의 실행 로그를 확인합니다:
   - Apps Script 편집기에서 **실행** > **doPost**를 실행합니다.
   - **실행 로그**에서 에러 메시지를 확인합니다.

2. 웹 앱 URL이 올바른지 확인합니다.

3. 브라우저 콘솔에서 네트워크 요청을 확인합니다 (개발자 도구 > Network 탭).

### CORS 오류가 발생하는 경우

- `no-cors` 모드를 사용하고 있으므로 응답을 읽을 수 없지만, 데이터는 정상적으로 전송됩니다.
- 콘솔에 "Google Sheets에 데이터 전송 완료" 메시지가 표시되면 정상 작동 중입니다.

## 보안 참고사항

- Google Apps Script 웹 앱은 공개적으로 접근 가능하므로, 스크립트에 추가적인 검증 로직을 추가하는 것을 권장합니다.
- 필요시 API 키나 토큰 기반 인증을 추가할 수 있습니다.

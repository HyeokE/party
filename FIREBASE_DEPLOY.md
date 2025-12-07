# Firebase Hosting 배포 가이드

이 프로젝트는 Firebase Hosting을 사용하여 배포됩니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속합니다.
2. **프로젝트 추가**를 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 이름을 입력하고 필요한 설정을 완료합니다.
4. **Hosting** 메뉴로 이동하여 Firebase Hosting을 활성화합니다.

## 2. Firebase CLI 설치 (로컬 개발용, 선택사항)

로컬에서 테스트하려면 Firebase CLI를 설치합니다:

```bash
npm install -g firebase-tools
```

## 3. Firebase 프로젝트 초기화

프로젝트 루트에서 다음 명령어를 실행합니다:

```bash
firebase login
firebase init hosting
```

초기화 시:
- 기존 프로젝트 선택 또는 새 프로젝트 생성
- Public directory: `dist`
- Single-page app: `Yes`
- Set up automatic builds: `No` (GitHub Actions 사용)

## 4. .firebaserc 파일 수정

`.firebaserc` 파일의 `your-firebase-project-id`를 실제 Firebase 프로젝트 ID로 변경합니다:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## 5. GitHub Secrets 설정

GitHub 리포지토리에서 다음 Secrets를 설정합니다:

### FIREBASE_PROJECT_ID
1. **Settings** > **Secrets and variables** > **Actions**로 이동
2. **New repository secret** 클릭
3. Name: `FIREBASE_PROJECT_ID`
4. Secret: Firebase 프로젝트 ID (`.firebaserc`에 설정한 값)

### FIREBASE_SERVICE_ACCOUNT
1. Firebase Console에서 **프로젝트 설정** > **서비스 계정** 탭으로 이동
2. **새 비공개 키 생성** 클릭하여 JSON 키 파일 다운로드
3. 다운로드한 JSON 파일의 전체 내용을 복사
4. GitHub Secrets에 추가:
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Secret: JSON 파일의 전체 내용 (한 줄로 붙여넣기)

### VITE_GOOGLE_SCRIPT_URL (기존)
Google Sheets 연동을 사용하는 경우 이 Secret도 유지합니다.

## 6. 배포 테스트

### 로컬에서 빌드 및 배포 테스트

```bash
# 빌드
pnpm build

# Firebase에 배포 (로컬)
firebase deploy --only hosting
```

### GitHub Actions를 통한 자동 배포

1. `main` 브랜치에 코드를 push하면 자동으로 배포가 시작됩니다.
2. **Actions** 탭에서 배포 진행 상황을 확인할 수 있습니다.
3. 배포가 완료되면 Firebase Console의 Hosting 섹션에서 배포 URL을 확인할 수 있습니다.

## 7. 커스텀 도메인 설정 (선택사항)

Firebase Console의 Hosting 섹션에서 커스텀 도메인을 추가할 수 있습니다.

## 문제 해결

### 배포 실패 시

1. GitHub Actions 로그 확인:
   - 리포지토리의 **Actions** 탭에서 실패한 워크플로우 클릭
   - 에러 메시지 확인

2. Firebase Service Account 권한 확인:
   - Firebase Console > 프로젝트 설정 > 서비스 계정
   - 서비스 계정에 Firebase Hosting 관리자 권한이 있는지 확인

3. 프로젝트 ID 확인:
   - `.firebaserc` 파일의 프로젝트 ID가 올바른지 확인
   - GitHub Secrets의 `FIREBASE_PROJECT_ID`가 올바른지 확인

### 빌드 에러 시

- 환경 변수가 올바르게 설정되었는지 확인
- 로컬에서 `pnpm build`가 성공하는지 확인


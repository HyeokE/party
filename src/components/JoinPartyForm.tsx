import BackButton from './ui/BackButton'
import UserInfoForm from './forms/UserInfoForm'

export default function JoinPartyForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-slide-up">
        <BackButton />
        <UserInfoForm
          title="파티 참여 신청"
          description="아래 정보를 입력하고 함께 즐거운 시간을 보내요!"
          icon="🎊"
          primaryColor="#FF6B6B"
          secondaryColor="#FF8E53"
          buttonText="다음 단계로 →"
          redirectPath="/account"
          sheetType="join"
        />
      </div>
    </div>
  )
}

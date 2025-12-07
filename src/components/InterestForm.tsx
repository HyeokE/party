import BackButton from './ui/BackButton'
import UserInfoForm from './forms/UserInfoForm'

export default function InterestForm() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-slide-up">
        <BackButton />
        <UserInfoForm
          title="알림 신청"
          description="파티가 열리기 며칠 전에 알림을 보내드립니다"
          icon="✨"
          primaryColor="#4ECDC4"
          secondaryColor="#45B7D1"
          buttonText="알림 신청하기 ✨"
          redirectPath="/interest-success"
          sheetType="interest"
          infoBanner={{
            icon: '📢',
            title: '알림 서비스',
            description: '파티 일정이 확정되면 등록하신 연락처로 안내 메시지를 보내드립니다. 그때 참여 여부를 결정하실 수 있어요!'
          }}
        />
      </div>
    </div>
  )
}

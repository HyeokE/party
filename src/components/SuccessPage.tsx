import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'

interface SuccessPageProps {
  isInterest?: boolean
}

export default function SuccessPage({ isInterest = false }: SuccessPageProps) {
  const navigate = useNavigate()
  const { userData } = useUserData()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      {/* Animated confetti elements */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm transform rotate-45"
                style={{
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8E53', '#45B7D1'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full animate-scale-in">
        <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-3xl p-8 md:p-16 shadow-2xl border border-white/5 text-center overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-24 h-24 border-4 border-[#FF6B6B] rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] rounded-lg rotate-12" />
            <div className="absolute top-1/2 right-20 w-16 h-16 border-4 border-[#FFE66D]" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Icon */}
            <div className="inline-block">
              <div className="text-7xl md:text-8xl animate-bounce-in">
                {isInterest ? '✨' : '🎉'}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="font-righteous text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFE66D] bg-clip-text text-transparent">
                  {isInterest ? '알림 신청 완료!' : '참여 완료!'}
                </span>
              </h1>

              <p className="font-outfit text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
                {isInterest ? (
                  <>
                    <span className="text-[#4ECDC4] font-semibold">{userData.name}</span>님,<br />
                    파티 며칠 전에 알림을 보내드릴게요!
                  </>
                ) : (
                  <>
                    <span className="text-[#FF6B6B] font-semibold">{userData.name}</span>님,<br />
                    파티에 성공적으로 등록되었습니다!
                  </>
                )}
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#0F1419] rounded-2xl p-6 max-w-md mx-auto border border-white/10">
              <div className="space-y-3 font-outfit text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">이름</span>
                  <span className="text-white font-semibold">{userData.name}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">전화번호</span>
                  <span className="text-white font-semibold">{userData.phone}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">이메일</span>
                  <span className="text-white font-semibold text-sm">{userData.email}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-gradient-to-r from-[#4ECDC4]/10 to-[#45B7D1]/10 rounded-xl p-5 border border-[#4ECDC4]/20 max-w-md mx-auto">
              <p className="font-outfit text-gray-300">
                {isInterest ? (
                  <>
                    <span className="text-[#4ECDC4] font-semibold">📱</span> 등록하신 연락처로 파티 일정을 안내해드립니다
                  </>
                ) : (
                  <>
                    <span className="text-[#FFE66D] font-semibold">💌</span> 자세한 안내는 이메일로 발송됩니다
                  </>
                )}
              </p>
            </div>

            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="mt-8 px-12 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] text-white font-righteous text-lg rounded-xl hover:shadow-lg hover:shadow-[#4ECDC4]/50 transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group min-h-[52px]"
            >
              <span className="relative z-10">홈으로 돌아가기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#45B7D1] to-[#4ECDC4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

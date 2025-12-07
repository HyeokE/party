import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'

export default function AccountInfoPage() {
  const navigate = useNavigate()
  const { userData } = useUserData()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const accountNumber = '국민은행 123-456-789012'

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber)
    // Could add a toast notification here
  }

  const handleSubmit = () => {
    if (isConfirmed) {
      navigate('/success')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Back Button */}
        <button
          onClick={() => navigate('/join')}
          className="mb-8 font-outfit text-gray-400 hover:text-[#4ECDC4] transition-colors flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          이전으로
        </button>

        <div className="space-y-6">
          {/* User Info Card */}
          <div className="bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-2xl p-6 border border-white/5">
            <h3 className="font-outfit text-sm text-gray-400 uppercase tracking-wide mb-3">참여자 정보</h3>
            <div className="space-y-2 font-outfit">
              <p className="text-white"><span className="text-gray-400">이름:</span> {userData.name}</p>
              <p className="text-white"><span className="text-gray-400">전화번호:</span> {userData.phone}</p>
              <p className="text-white"><span className="text-gray-400">이메일:</span> {userData.email}</p>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-br from-[#FFE66D] to-[#FF8E53] rounded-full opacity-20 blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8 space-y-3">
                <div className="text-5xl mb-3 animate-bounce-subtle">💰</div>
                <h2 className="font-righteous text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">
                  입금 정보
                </h2>
                <p className="font-outfit text-gray-400">
                  아래 계좌로 입금을 완료해주세요
                </p>
              </div>

              {/* Account Number Display */}
              <div className="bg-[#0F1419] rounded-2xl p-6 mb-8 border-2 border-[#4ECDC4]/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4ECDC4]/5 to-[#45B7D1]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <p className="font-outfit text-sm text-gray-400 mb-2 uppercase tracking-wide">계좌번호</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-righteous text-2xl md:text-3xl text-white">
                      {accountNumber}
                    </p>
                    <button
                      onClick={handleCopyAccount}
                      className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#45B7D1] text-[#0F1419] font-outfit font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      복사
                    </button>
                  </div>
                </div>
              </div>

              {/* Amount Info (Optional - you can add amount here) */}
              <div className="bg-gradient-to-r from-[#FFE66D]/10 to-[#FF8E53]/10 rounded-xl p-5 mb-8 border border-[#FFE66D]/20">
                <p className="font-outfit text-gray-300">
                  <span className="text-[#FFE66D] font-semibold">💡 TIP:</span> 입금자명은 신청하신 이름으로 해주세요
                </p>
              </div>

              {/* Confirmation Checkbox */}
              <div className="space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-7 h-7 border-2 border-white/20 rounded-lg peer-checked:bg-gradient-to-br peer-checked:from-[#FF6B6B] peer-checked:to-[#FF8E53] peer-checked:border-[#FF6B6B] transition-all duration-300 flex items-center justify-center">
                      <svg
                        className={`w-5 h-5 text-white transition-all duration-300 ${isConfirmed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="font-outfit text-lg text-gray-300 group-hover:text-white transition-colors">
                    입금을 완료했습니다
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!isConfirmed}
                  className={`w-full font-righteous text-2xl py-5 rounded-xl transform transition-all duration-300 relative overflow-hidden group ${
                    isConfirmed
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="relative z-10">참여 완료하기 🎉</span>
                  {isConfirmed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF8E53] to-[#FFE66D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import { type UserData } from '../context/UserDataContext'

export default function InterestForm() {
  const navigate = useNavigate()
  const { updateUserData } = useUserData()

  const [formData, setFormData] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserData(formData)
    navigate('/interest-success')
  }

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 font-outfit text-gray-400 hover:text-[#4ECDC4] transition-colors flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          홈으로 돌아가기
        </button>

        {/* Form Card */}
        <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
          {/* Decorative corner elements */}
          <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] rounded-full opacity-20 blur-2xl" />
          <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-br from-[#FFE66D] to-[#FF8E53] rounded-full opacity-20 blur-2xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10 space-y-3">
              <div className="inline-block">
                <div className="text-6xl mb-4 animate-bounce-subtle">✨</div>
              </div>
              <h2 className="font-righteous text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">
                알림 신청
              </h2>
              <p className="font-outfit text-gray-400 text-lg">
                파티가 열리기 며칠 전에 알림을 보내드립니다
              </p>
            </div>

            {/* Info Banner */}
            <div className="mb-8 bg-gradient-to-r from-[#4ECDC4]/10 to-[#45B7D1]/10 rounded-xl p-5 border border-[#4ECDC4]/20">
              <p className="font-outfit text-gray-300 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">📢</span>
                <span>
                  <strong className="text-[#4ECDC4]">알림 서비스:</strong> 파티 일정이 확정되면 등록하신 연락처로 안내 메시지를 보내드립니다. 그때 참여 여부를 결정하실 수 있어요!
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="font-outfit text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#4ECDC4]">★</span> 이름
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-[#0F1419] border-2 border-white/10 rounded-xl px-5 py-4 font-outfit text-white text-lg focus:border-[#4ECDC4] focus:outline-none focus:ring-4 focus:ring-[#4ECDC4]/20 transition-all duration-300"
                  placeholder="홍길동"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="font-outfit text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#4ECDC4]">★</span> 전화번호
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-[#0F1419] border-2 border-white/10 rounded-xl px-5 py-4 font-outfit text-white text-lg focus:border-[#45B7D1] focus:outline-none focus:ring-4 focus:ring-[#45B7D1]/20 transition-all duration-300"
                  placeholder="010-1234-5678"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="font-outfit text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-2">
                  <span className="text-[#4ECDC4]">★</span> 이메일
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-[#0F1419] border-2 border-white/10 rounded-xl px-5 py-4 font-outfit text-white text-lg focus:border-[#FFE66D] focus:outline-none focus:ring-4 focus:ring-[#FFE66D]/20 transition-all duration-300"
                  placeholder="party@example.com"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] text-white font-righteous text-2xl py-5 rounded-xl hover:shadow-lg hover:shadow-[#4ECDC4]/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">알림 신청하기 ✨</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#45B7D1] to-[#4ECDC4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

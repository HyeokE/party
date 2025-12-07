import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full space-y-12 animate-fade-in">
        {/* Title Section */}
        <div className="text-center space-y-6 relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-4 w-16 h-16 border-4 border-[#FF6B6B] rotate-12 rounded-lg opacity-60 animate-spin-slow" />
          <div className="absolute -bottom-4 -right-6 w-12 h-12 bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] rounded-full opacity-40" />

          <h1 className="font-righteous text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFE66D] bg-clip-text text-transparent animate-gradient">
              PARTY
            </span>
          </h1>
          <p className="font-outfit text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            특별한 순간을 함께할 준비가 되셨나요?<br />
            <span className="text-[#4ECDC4] font-semibold">지금 바로 참여하세요!</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {/* Join Party Button */}
          <button
            onClick={() => navigate('/join')}
            className="group relative bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] p-8 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FF6B6B]/50"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />

            <div className="relative z-10 text-left space-y-3">
              <div className="text-5xl">🎉</div>
              <h3 className="font-righteous text-2xl md:text-3xl text-white font-bold">
                파티 참여하기
              </h3>
              <p className="font-outfit text-white/90 text-base">
                지금 바로 등록하고 함께해요!
              </p>
            </div>

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full" />
          </button>

          {/* Interest Button */}
          <button
            onClick={() => navigate('/interest')}
            className="group relative bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] p-8 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#4ECDC4]/50"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 transform -rotate-12 group-hover:rotate-12 transition-transform duration-500" />

            <div className="relative z-10 text-left space-y-3">
              <div className="text-5xl">✨</div>
              <h3 className="font-righteous text-2xl md:text-3xl text-white font-bold">
                관심 있어요
              </h3>
              <p className="font-outfit text-white/90 text-base">
                알림을 받고 나중에 결정할게요
              </p>
            </div>

            <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-tl-full" />
          </button>
        </div>

        {/* Decorative footer text */}
        <div className="text-center mt-16 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FFE66D]" />
            <p className="font-outfit text-sm text-gray-500 uppercase tracking-wider">
              Let's Celebrate Together
            </p>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FFE66D]" />
          </div>
        </div>
      </div>
    </div>
  )
}

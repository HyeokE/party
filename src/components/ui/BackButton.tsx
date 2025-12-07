import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/')}
      className="mb-8 font-outfit text-gray-400 hover:text-[#4ECDC4] transition-colors flex items-center gap-2 group"
    >
      <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
      홈으로 돌아가기
    </button>
  )
}

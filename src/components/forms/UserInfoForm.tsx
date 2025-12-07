import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData'
import { userDataSchema, type UserDataFormValues } from '../../lib/schemas/userSchema'
import { saveToGoogleSheets } from '../../lib/googleSheets'
import FormField from '../ui/FormField'

interface UserInfoFormProps {
  title: string
  description: string
  icon: string
  primaryColor: string
  secondaryColor: string
  buttonText: string
  redirectPath: string
  sheetType: 'join' | 'interest'
  infoBanner?: {
    icon: string
    title: string
    description: string
  }
}

export default function UserInfoForm({
  title,
  description,
  icon,
  primaryColor,
  secondaryColor,
  buttonText,
  redirectPath,
  sheetType,
  infoBanner
}: UserInfoFormProps) {
  const navigate = useNavigate()
  const { updateUserData } = useUserData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserDataFormValues>({
    resolver: zodResolver(userDataSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: UserDataFormValues) => {
    setIsSubmitting(true)
    try {
      updateUserData(data)
      await saveToGoogleSheets(data, sheetType)
      navigate(redirectPath)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-white/5">
      {/* Decorative corner elements */}
      <div className={`absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-[${primaryColor}] to-[${secondaryColor}] rounded-full opacity-20 blur-2xl`} />
      <div className={`absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-br from-[${secondaryColor}] to-[${primaryColor}] rounded-full opacity-20 blur-2xl`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-block">
            <div className="text-6xl mb-4 animate-bounce-subtle">{icon}</div>
          </div>
          <h2 className={`font-righteous text-3xl md:text-4xl font-bold bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] bg-clip-text text-transparent`}>
            {title}
          </h2>
          <p className="font-outfit text-gray-400 text-lg">
            {description}
          </p>
        </div>

        {/* Info Banner */}
        {infoBanner && (
          <div className={`mb-8 bg-gradient-to-r from-[${primaryColor}]/10 to-[${secondaryColor}]/10 rounded-xl p-5 border border-[${primaryColor}]/20`}>
            <p className="font-outfit text-gray-300 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{infoBanner.icon}</span>
              <span>
                <strong className={`text-[${primaryColor}]`}>{infoBanner.title}:</strong> {infoBanner.description}
              </span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            label="이름"
            type="text"
            placeholder="홍길동"
            register={register}
            errors={errors}
            focusColor={primaryColor}
          />

          <FormField
            name="phone"
            label="전화번호"
            type="tel"
            placeholder="010-1234-5678"
            register={register}
            errors={errors}
            focusColor={secondaryColor}
          />

          <FormField
            name="email"
            label="이메일"
            type="email"
            placeholder="party@example.com"
            register={register}
            errors={errors}
            focusColor="#FFE66D"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-8 bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white font-righteous text-xl py-5 rounded-xl hover:shadow-lg hover:shadow-[${primaryColor}]/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            <span className="relative z-10">
              {isSubmitting ? '처리 중...' : buttonText}
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r from-[${secondaryColor}] to-[${primaryColor}] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </button>
        </form>
      </div>
    </div>
  )
}

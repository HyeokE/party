import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData'
import { userDataSchema, type UserDataFormValues } from '../../lib/schemas/userSchema'
import { saveToGoogleSheets } from '../../lib/googleSheets'
import { checkDuplicateSubmission } from '../../lib/api'
import ConfirmationDialog from '../ui/ConfirmationDialog'

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

type StepIndex = 0 | 1 | 2

interface FormStep {
  field: keyof UserDataFormValues
  label: string
  placeholder: string
  type: 'text' | 'tel' | 'email'
  color: string
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
  const inputRef = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState<StepIndex>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    existingType: 'join' | 'interest' | null
    name: string | null
  }>({
    isOpen: false,
    existingType: null,
    name: null
  })

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<UserDataFormValues>({
    resolver: zodResolver(userDataSchema),
    mode: 'onChange'
  })

  const formValues = watch()

  // 폼 스텝 정의
  const FORM_STEPS: FormStep[] = [
    {
      field: 'name',
      label: '이름',
      placeholder: '홍길동',
      type: 'text',
      color: primaryColor
    },
    {
      field: 'phone',
      label: '전화번호',
      placeholder: '010-1234-5678',
      type: 'tel',
      color: secondaryColor
    },
    {
      field: 'email',
      label: '이메일',
      placeholder: 'party@example.com',
      type: 'email',
      color: '#FFE66D'
    }
  ]

  const currentStepData = FORM_STEPS[currentStep]
  const currentValue = formValues[currentStepData.field] || ''
  const currentError = errors[currentStepData.field]
  const isLastStep = currentStep === 2
  const canProceed = currentValue && !currentError

  // Auto-focus on step change
  useEffect(() => {
    inputRef.current?.focus()
  }, [currentStep])

  const goToNextStep = async () => {
    const isValid = await trigger(currentStepData.field)
    if (isValid && !isLastStep) {
      setCurrentStep((prev) => (prev + 1) as StepIndex)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as StepIndex)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLastStep && canProceed) {
      e.preventDefault()
      goToNextStep()
    }
  }

  const handleFormSubmit = async (data: UserDataFormValues) => {
    // 중복 체크
    setIsCheckingDuplicate(true)
    const duplicateCheck = await checkDuplicateSubmission(data.email, data.phone)
    setIsCheckingDuplicate(false)

    // 중복이고 타입이 다르면 확인 다이얼로그 표시
    if (duplicateCheck.exists && duplicateCheck.type !== sheetType) {
      setConfirmDialog({
        isOpen: true,
        existingType: duplicateCheck.type,
        name: duplicateCheck.name
      })
      return
    }

    // 중복 아니거나 같은 타입이면 바로 제출
    await submitForm(data)
  }

  const submitForm = async (data: UserDataFormValues) => {
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

  const handleConfirmTypeChange = async () => {
    setConfirmDialog({ isOpen: false, existingType: null, name: null })
    await submitForm(formValues as UserDataFormValues)
  }

  const handleCancelTypeChange = () => {
    setConfirmDialog({ isOpen: false, existingType: null, name: null })
  }

  return (
    <>
      <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-white/5">
        {/* Decorative elements */}
        <div className={`absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-[${primaryColor}] to-[${secondaryColor}] rounded-full opacity-20 blur-2xl`} />
        <div className={`absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-br from-[${secondaryColor}] to-[${primaryColor}] rounded-full opacity-20 blur-2xl`} />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-10 space-y-3">
            <div className="text-6xl mb-4 animate-bounce-subtle">{icon}</div>
            <h2 className={`font-righteous text-3xl md:text-4xl font-bold bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] bg-clip-text text-transparent`}>
              {title}
            </h2>
            <p className="font-outfit text-gray-400 text-lg">{description}</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {FORM_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? `w-12 bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`
                    : index < currentStep
                    ? `w-8 bg-[${primaryColor}]/50`
                    : 'w-8 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <div className="text-center mb-6">
            <span className="font-outfit text-sm text-gray-400">
              {currentStep + 1} / {FORM_STEPS.length}
            </span>
          </div>

          {/* Info Banner (first step only) */}
          {infoBanner && currentStep === 0 && (
            <div className={`mb-8 bg-gradient-to-r from-[${primaryColor}]/10 to-[${secondaryColor}]/10 rounded-xl p-5 border border-[${primaryColor}]/20 animate-slide-down`}>
              <p className="font-outfit text-gray-300 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{infoBanner.icon}</span>
                <span>
                  <strong className={`text-[${primaryColor}]`}>{infoBanner.title}:</strong>{' '}
                  {infoBanner.description}
                </span>
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Current Step Field */}
            <div className="min-h-[120px]" key={currentStep}>
              <label className="font-outfit text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-2 mb-2">
                <span className={`text-[${currentStepData.color}]`}>★</span>
                {currentStepData.label}
              </label>

              <input
                {...register(currentStepData.field)}
                ref={inputRef}
                type={currentStepData.type}
                placeholder={currentStepData.placeholder}
                onKeyDown={handleKeyDown}
                className={`w-full bg-[#0F1419] border-2 rounded-xl px-5 py-4 font-outfit text-white text-lg focus:outline-none focus:ring-4 transition-all duration-300 min-h-[56px] ${
                  currentError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                    : `border-white/10 focus:border-[${currentStepData.color}] focus:ring-[${currentStepData.color}]/20`
                }`}
              />

              {currentError && (
                <p className="text-red-400 text-sm font-outfit mt-2 animate-slide-down">
                  {currentError.message}
                </p>
              )}

              {!isLastStep && canProceed && (
                <p className="text-gray-400 text-sm font-outfit mt-2 animate-fade-in">
                  Enter 키를 눌러 다음으로 →
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-outfit font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[56px]"
                >
                  ← 이전
                </button>
              )}

              {isLastStep ? (
                <button
                  type="submit"
                  disabled={!canProceed || isSubmitting || isCheckingDuplicate}
                  className={`flex-1 font-righteous text-xl py-5 rounded-xl transform transition-all duration-300 relative overflow-hidden group min-h-[56px] ${
                    canProceed && !isSubmitting && !isCheckingDuplicate
                      ? `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white hover:shadow-lg hover:shadow-[${primaryColor}]/50 hover:scale-[1.02] active:scale-[0.98]`
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="relative z-10">
                    {isCheckingDuplicate
                      ? '확인 중...'
                      : isSubmitting
                      ? '처리 중...'
                      : buttonText}
                  </span>
                  {canProceed && !isSubmitting && !isCheckingDuplicate && (
                    <div className={`absolute inset-0 bg-gradient-to-r from-[${secondaryColor}] to-[${primaryColor}] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!canProceed}
                  className={`flex-1 font-righteous text-xl py-5 rounded-xl transform transition-all duration-300 min-h-[56px] ${
                    canProceed
                      ? `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white hover:shadow-lg hover:shadow-[${primaryColor}]/50 hover:scale-[1.02] active:scale-[0.98]`
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음 →
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="이전 신청 기록이 있습니다"
        message={`${confirmDialog.name || '회원'}님은 이전에 "${
          confirmDialog.existingType === 'join' ? '참여하기' : '알림 받기'
        }"로 신청하셨습니다. "${
          sheetType === 'join' ? '참여하기' : '알림 받기'
        }"로 변경하시겠습니까?`}
        confirmText="변경하기"
        cancelText="취소"
        onConfirm={handleConfirmTypeChange}
        onCancel={handleCancelTypeChange}
      />
    </>
  )
}

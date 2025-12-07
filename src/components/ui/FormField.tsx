import { type InputHTMLAttributes } from 'react'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type UserDataFormValues } from '../../lib/schemas/userSchema'

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  name: keyof UserDataFormValues
  label: string
  register: UseFormRegister<UserDataFormValues>
  errors: FieldErrors<UserDataFormValues>
  focusColor: string
  icon?: string
}

export default function FormField({
  name,
  label,
  register,
  errors,
  focusColor,
  icon = '★',
  ...inputProps
}: FormFieldProps) {
  const error = errors[name]

  return (
    <div className="space-y-2">
      <label className="font-outfit text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-2">
        <span className={`text-[${focusColor}]`}>{icon}</span> {label}
      </label>
      <input
        {...register(name)}
        {...inputProps}
        className={`w-full bg-[#0F1419] border-2 rounded-xl px-5 py-4 font-outfit text-white text-lg focus:outline-none focus:ring-4 transition-all duration-300 min-h-[48px] ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
            : `border-white/10 focus:border-[${focusColor}] focus:ring-[${focusColor}]/20`
        }`}
      />
      {error && (
        <p className="text-red-400 text-sm font-outfit animate-slide-down">
          {error.message}
        </p>
      )}
    </div>
  )
}

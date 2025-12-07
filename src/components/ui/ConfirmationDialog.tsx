interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-gradient-to-br from-[#1A1B2E] to-[#252838] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-white/10 animate-scale-in">
        {/* Icon */}
        <div className="text-5xl mb-4 text-center">⚠️</div>

        {/* Title */}
        <h3 className="font-righteous text-2xl text-white text-center mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="font-outfit text-base text-gray-300 text-center mb-6 leading-relaxed">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-outfit font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:shadow-lg hover:shadow-[#FF6B6B]/50 text-white font-outfit font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

import { ChevronLeft } from 'lucide-react'

interface Props {
  onBack: () => void
}

export default function BackButton({ onBack }: Props) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-sm text-[#8B7B6B] hover:text-[#2A2520] transition-colors py-2 px-1"
    >
      <ChevronLeft className="w-4 h-4" />
      Back
    </button>
  )
}

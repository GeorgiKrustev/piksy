import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cream-200 flex items-center justify-center mb-5">
        <SettingsIcon className="w-7 h-7 text-stone-400" />
      </div>
      <h1 className="text-xl font-semibold text-stone-700 mb-2">Settings</h1>
      <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
        Account, billing, and team settings are coming soon. For now, just keep building presents.
      </p>
      <div className="mt-6 px-4 py-2.5 rounded-xl bg-cream-200 text-xs text-stone-500 font-medium">
        Coming soon
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Input }    from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Textarea'
import { Button }   from '../../../components/ui/Button'

export default function LandingStep({ present, draft, actions }) {
  const saved = present.landingPage
  const [form, setForm] = useState({
    heroTitle:    saved.heroTitle    ?? '',
    heroSubtitle: saved.heroSubtitle ?? '',
    heroMessage:  saved.heroMessage  ?? '',
  })

  // Propagate changes to draft whenever form changes
  useEffect(() => {
    actions.setLandingDraft(form)
  }, [form]) // eslint-disable-line react-hooks/exhaustive-deps

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800">Landing Page</h2>
        <p className="text-sm text-stone-400 mt-0.5">
          This is the first screen your recipient sees — make it feel warm and personal.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          label="Hero title"
          placeholder={`e.g. Happy 30th, ${present.recipient.name}`}
          value={form.heroTitle}
          onChange={set('heroTitle')}
          helperText="The big headline — keep it personal"
        />
        <Input
          label="Subtitle"
          placeholder="A little something special for you"
          value={form.heroSubtitle}
          onChange={set('heroSubtitle')}
          helperText="Optional — a soft supporting line"
        />
        <Textarea
          label="Personal message"
          placeholder="Write something from the heart…"
          value={form.heroMessage}
          onChange={set('heroMessage')}
          rows={5}
          helperText="This shows below the headline. Be yourself."
        />
      </div>

      <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-stone-100">
        <Button variant="secondary" size="sm" onClick={actions.save}>
          Save
        </Button>
        <Button variant="primary" size="sm" onClick={actions.saveAndNext}>
          Save & Continue
        </Button>
      </div>
    </div>
  )
}

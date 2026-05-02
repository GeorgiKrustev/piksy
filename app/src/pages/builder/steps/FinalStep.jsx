import { useEffect, useState } from 'react'
import { Input }    from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Textarea'
import { Button }   from '../../../components/ui/Button'

export default function FinalStep({ present, actions }) {
  const { setFinalDraft, goPrev, saveAndNext } = actions

  const saved = present.finalScreen
  const [form, setForm] = useState({
    title:    saved.title    ?? '',
    message:  saved.message  ?? '',
    ctaLabel: saved.ctaLabel ?? 'Send my choice',
  })

  useEffect(() => {
    setFinalDraft(form)
  }, [form, setFinalDraft])

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800">Final Screen</h2>
        <p className="text-sm text-stone-400 mt-0.5">
          The last thing {present.recipient.name} sees after choosing their gift.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          label="Title"
          placeholder="e.g. Can't wait to celebrate with you"
          value={form.title}
          onChange={set('title')}
          helperText="A warm closing headline"
        />
        <Textarea
          label="Closing message"
          placeholder="Write a final personal note…"
          value={form.message}
          onChange={set('message')}
          rows={4}
          helperText="Optional — this shows below the title"
        />
        <Input
          label="Button label"
          placeholder="Send my choice"
          value={form.ctaLabel}
          onChange={set('ctaLabel')}
          helperText="The action button your recipient clicks to confirm"
        />
      </div>

      <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-stone-100">
        <Button variant="ghost"   size="sm" onClick={goPrev}>Back</Button>
        <Button variant="primary" size="sm" onClick={saveAndNext}>Save & Continue</Button>
      </div>
    </div>
  )
}

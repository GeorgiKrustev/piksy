import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button }   from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { createDetailSection } from '../../../types/models'

export default function DetailsStep({ present, actions }) {
  const [selectedId, setSelectedId] = useState(present.giftOptions[0]?.id ?? null)
  const selectedOption = present.giftOptions.find((o) => o.id === selectedId)

  function addSection() {
    if (!selectedOption) return
    const section  = createDetailSection()
    actions.gifts.update(selectedId, {
      detailSections: [...selectedOption.detailSections, section],
    })
  }

  function updateSection(sectionId, content) {
    actions.gifts.update(selectedId, {
      detailSections: selectedOption.detailSections.map((s) =>
        s.id === sectionId ? { ...s, content } : s
      ),
    })
  }

  function removeSection(sectionId) {
    actions.gifts.update(selectedId, {
      detailSections: selectedOption.detailSections.filter((s) => s.id !== sectionId),
    })
  }

  if (present.giftOptions.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-8 py-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-2">Detail Pages</h2>
        <p className="text-sm text-stone-400">
          Add gift options in the previous step first, then come back here to fill in each gift's detail page.
        </p>
        <div className="mt-6">
          <Button variant="ghost" size="sm" onClick={actions.goPrev}>← Back to Gift Options</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800">Detail Pages</h2>
        <p className="text-sm text-stone-400 mt-0.5">
          Write the full story for each gift — why you chose it, what it involves.
        </p>
      </div>

      {/* Gift selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {present.giftOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              selectedId === opt.id
                ? 'bg-terracotta-500 text-white'
                : 'bg-cream-200 text-stone-600 hover:bg-cream-300'
            }`}
          >
            {opt.title || 'Untitled'}
          </button>
        ))}
      </div>

      {/* Section editor */}
      {selectedOption && (
        <div className="flex flex-col gap-4">
          {selectedOption.detailSections.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-stone-200 rounded-xl">
              <p className="text-sm text-stone-400 mb-3">No content yet for this gift.</p>
              <Button variant="secondary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={addSection}>
                Add section
              </Button>
            </div>
          ) : (
            <>
              {selectedOption.detailSections.map((section, i) => (
                <div key={section.id} className="flex gap-3">
                  <div className="flex-1">
                    <Textarea
                      label={`Section ${i + 1}`}
                      value={section.content}
                      onChange={(e) => updateSection(section.id, e.target.value)}
                      rows={4}
                      placeholder="Write something meaningful about this gift…"
                    />
                  </div>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="mt-6 p-1.5 h-8 rounded-lg text-stone-300 hover:bg-red-50 hover:text-red-400 transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={addSection}
                className="self-start"
              >
                Add section
              </Button>
            </>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-stone-100">
        <Button variant="ghost" size="sm" onClick={actions.goPrev}>Back</Button>
        <Button variant="primary" size="sm" onClick={actions.goNext}>Continue</Button>
      </div>
    </div>
  )
}

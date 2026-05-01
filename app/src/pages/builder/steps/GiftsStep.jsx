import { useState } from 'react'
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { Button }   from '../../../components/ui/Button'
import { Input }    from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Textarea'
import { Card }     from '../../../components/ui/Card'
import { EmptyState } from '../../../components/ui/EmptyState'

function GiftOptionRow({ option, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card variant="default" padding="none">
      <div className="flex items-center gap-3 px-4 py-3">
        <GripVertical className="w-4 h-4 text-stone-300 shrink-0 cursor-grab" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-700 truncate">{option.title || 'Untitled gift'}</p>
          {option.priceRange && (
            <p className="text-xs text-stone-400">{option.priceRange}</p>
          )}
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1.5 rounded-lg text-stone-400 hover:bg-cream-200 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          onClick={() => onRemove(option.id)}
          className="p-1.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-stone-100 pt-3">
          <Input
            label="Gift title"
            value={option.title}
            onChange={(e) => onUpdate(option.id, { title: e.target.value })}
            placeholder="e.g. Weekend Spa Retreat"
          />
          <Textarea
            label="Short description"
            value={option.description}
            onChange={(e) => onUpdate(option.id, { description: e.target.value })}
            rows={2}
            placeholder="A one-line description shown on the selection screen"
          />
          <Input
            label="Price range"
            value={option.priceRange}
            onChange={(e) => onUpdate(option.id, { priceRange: e.target.value })}
            placeholder="e.g. $100–200"
          />
        </div>
      )}
    </Card>
  )
}

export default function GiftsStep({ present, actions }) {
  function handleAdd() {
    actions.gifts.add({ title: 'New Gift Option' })
  }

  function handleUpdate(optionId, updates) {
    actions.gifts.update(optionId, updates)
  }

  function handleRemove(optionId) {
    if (window.confirm('Remove this gift option?')) {
      actions.gifts.remove(optionId)
    }
  }

  const sorted = [...present.giftOptions].sort((a, b) => a.order - b.order)

  return (
    <div className="max-w-xl mx-auto px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-stone-800">Gift Options</h2>
          <p className="text-sm text-stone-400 mt-0.5">
            Add the gifts {present.recipient.name} can choose from.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={handleAdd}
        >
          Add Gift
        </Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={<Plus className="w-5 h-5" />}
          title="No gift options yet"
          description="Add at least one gift for your recipient to choose from."
          action={{ label: 'Add Gift Option', onClick: handleAdd }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((option) => (
            <GiftOptionRow
              key={option.id}
              option={option}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-stone-100">
        <Button variant="ghost" size="sm" onClick={actions.goPrev}>Back</Button>
        <Button variant="primary" size="sm" onClick={actions.goNext}>Continue</Button>
      </div>
    </div>
  )
}

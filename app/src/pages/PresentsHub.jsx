import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Gift, Pencil, Trash2, Globe, Lock, ChevronRight } from 'lucide-react'
import { usePresents }  from '../store'
import { Button }       from '../components/ui/Button'
import { Card }         from '../components/ui/Card'
import { Badge }        from '../components/ui/Badge'
import { Input }        from '../components/ui/Input'
import { Textarea }     from '../components/ui/Textarea'
import { EmptyState }   from '../components/ui/EmptyState'
import { Modal }        from '../components/ui/Modal'
import { formatDate }   from '../utils/helpers'
import { PresentStatus } from '../types/models'

// ---------------------------------------------------------------------------
// Create modal
// ---------------------------------------------------------------------------

function CreatePresentModal({ isOpen, onClose, onCreate }) {
  const [title,        setTitle]        = useState('')
  const [recipientName,setRecipientName]= useState('')
  const [relationship, setRelationship] = useState('')
  const [loading,      setLoading]      = useState(false)
  const [errors,       setErrors]       = useState({})

  function validate() {
    const e = {}
    if (!title.trim())         e.title        = 'Title is required'
    if (!recipientName.trim()) e.recipientName = "Recipient's name is required"
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const present = onCreate({ title: title.trim(), recipientName: recipientName.trim(), recipientRelationship: relationship.trim() || null })
    setLoading(false)
    setTitle(''); setRecipientName(''); setRelationship(''); setErrors({})
    onClose(present)
  }

  function handleClose() {
    setTitle(''); setRecipientName(''); setRelationship(''); setErrors({})
    onClose(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create a new present"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" size="sm" loading={loading} onClick={handleSubmit}>
            Create & Open Builder
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Present title"
          placeholder="e.g. Emma's 30th Birthday"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
          autoFocus
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Recipient's name"
            placeholder="e.g. Emma"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            error={errors.recipientName}
            required
          />
          <Input
            label="Relationship"
            placeholder="e.g. Sister"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            helperText="Optional"
          />
        </div>
        {/* Hidden submit so Enter key works */}
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>
    </Modal>
  )
}

// ---------------------------------------------------------------------------
// Present card
// ---------------------------------------------------------------------------

function PresentCard({ present, onOpenBuilder, onDelete }) {
  const isPublished = present.status === PresentStatus.PUBLISHED
  const giftCount   = present.giftOptions.length

  return (
    <Card variant="default" hoverable className="flex flex-col group">
      {/* Header */}
      <div
        className="p-5 pb-4 cursor-pointer flex-1"
        onClick={() => onOpenBuilder(present.id)}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-cream-200 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4 text-stone-400" />
          </div>
          <Badge variant={isPublished ? 'success' : 'default'} dot size="sm">
            {isPublished ? 'Published' : 'Draft'}
          </Badge>
        </div>
        <h3 className="text-base font-semibold text-stone-800 leading-tight mb-1 line-clamp-2">
          {present.title}
        </h3>
        <p className="text-sm text-stone-400">for {present.recipient.name}</p>
        {present.recipient.relationship && (
          <p className="text-xs text-stone-300 mt-0.5">{present.recipient.relationship}</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-stone-400">
          <span>{giftCount} {giftCount === 1 ? 'gift' : 'gifts'}</span>
          <span>·</span>
          <span>{formatDate(present.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onOpenBuilder(present.id)}
            className="p-1.5 rounded-lg text-stone-400 hover:bg-cream-200 hover:text-stone-600 transition-colors"
            title="Open Builder"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(present.id) }}
            className="p-1.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PresentsHub() {
  const navigate = useNavigate()
  const { presents, actions } = usePresents()
  const [showCreate, setShowCreate] = useState(false)

  function handleCreate(params) {
    return actions.create(params)
  }

  function handleCreateClose(present) {
    setShowCreate(false)
    if (present) navigate(`/builder/${present.id}`)
  }

  function handleDelete(id) {
    if (window.confirm('Delete this present? This cannot be undone.')) {
      actions.delete(id)
    }
  }

  const sorted = [...presents].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="page-title">Presents</h1>
          <p className="page-subtitle">{presents.length} present{presents.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowCreate(true)}
        >
          New Present
        </Button>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <EmptyState
          icon={<Gift className="w-6 h-6" />}
          title="No presents yet"
          description="Create your first gift website and share something meaningful."
          action={{ label: 'Create Present', onClick: () => setShowCreate(true) }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((present) => (
            <PresentCard
              key={present.id}
              present={present}
              onOpenBuilder={(id) => navigate(`/builder/${id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreatePresentModal
        isOpen={showCreate}
        onClose={handleCreateClose}
        onCreate={handleCreate}
      />
    </div>
  )
}

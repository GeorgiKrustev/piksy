import { useState } from 'react'
import { Plus, Sparkles, Pencil, Trash2, Search, X } from 'lucide-react'
import { useGifts }     from '../store'
import { Button }       from '../components/ui/Button'
import { Card }         from '../components/ui/Card'
import { Badge }        from '../components/ui/Badge'
import { Input }        from '../components/ui/Input'
import { Textarea }     from '../components/ui/Textarea'
import { EmptyState }   from '../components/ui/EmptyState'
import { Modal }        from '../components/ui/Modal'
import { GIFT_CATEGORIES } from '../types/models'

// ---------------------------------------------------------------------------
// Gift Idea form (shared by create + edit modals)
// ---------------------------------------------------------------------------

function GiftIdeaForm({ initial = {}, onSave, onCancel, loading, formId }) {
  const [form, setForm] = useState({
    title:       initial.title       ?? '',
    description: initial.description ?? '',
    category:    initial.category    ?? GIFT_CATEGORIES[0],
    priceRange:  initial.priceRange  ?? '',
    tags:        initial.tags?.join(', ') ?? '',
  })
  const [errors, setErrors] = useState({})

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({
      title:       form.title.trim(),
      description: form.description.trim(),
      category:    form.category,
      priceRange:  form.priceRange.trim(),
      tags:        form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    })
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Title"
        placeholder="e.g. Weekend Spa Retreat"
        value={form.title}
        onChange={set('title')}
        error={errors.title}
        required
        autoFocus
      />
      <Textarea
        label="Description"
        placeholder="Describe this gift idea…"
        value={form.description}
        onChange={set('description')}
        rows={3}
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-stone-700">Category</label>
          <select
            value={form.category}
            onChange={set('category')}
            className="h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-terracotta-400/30 focus:border-terracotta-400 hover:border-stone-300 transition-all"
          >
            {GIFT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Input
          label="Price range"
          placeholder="e.g. $100–200"
          value={form.priceRange}
          onChange={set('priceRange')}
        />
      </div>
      <Input
        label="Tags"
        placeholder="relaxation, spa, hotel"
        value={form.tags}
        onChange={set('tags')}
        helperText="Comma-separated"
      />
    </form>
  )
}

// ---------------------------------------------------------------------------
// Gift idea card
// ---------------------------------------------------------------------------

function GiftIdeaCard({ idea, onEdit, onDelete }) {
  return (
    <Card variant="default" hoverable className="flex flex-col group">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="warm" size="sm">{idea.category}</Badge>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(idea)}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-cream-200 hover:text-stone-600 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(idea.id)}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-stone-800 mb-1 leading-snug">{idea.title}</h3>
        {idea.description && (
          <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{idea.description}</p>
        )}
        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {idea.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-2xs px-2 py-0.5 rounded-full bg-cream-200 text-stone-500">{tag}</span>
            ))}
          </div>
        )}
      </div>
      {idea.priceRange && (
        <div className="px-5 py-3 border-t border-stone-100">
          <span className="text-xs font-medium text-stone-500">{idea.priceRange}</span>
        </div>
      )}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Gifts() {
  const { ideas, actions } = useGifts()
  const [search,       setSearch]       = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [showCreate,   setShowCreate]   = useState(false)
  const [editingIdea,  setEditingIdea]  = useState(null)
  const [saveLoading,  setSaveLoading]  = useState(false)

  // Client-side filter (the hook's search mutates its own state;
  // here we do it inline for simplicity, preserving all ideas in hook)
  const filtered = ideas.filter((idea) => {
    const q   = search.toLowerCase()
    const matchQ = !q || idea.title.toLowerCase().includes(q) || idea.description.toLowerCase().includes(q)
    const matchC = !activeCategory || idea.category === activeCategory
    return matchQ && matchC
  })

  function handleCreate(data) {
    setSaveLoading(true)
    actions.create(data)
    setSaveLoading(false)
    setShowCreate(false)
  }

  function handleEdit(data) {
    setSaveLoading(true)
    actions.update(editingIdea.id, data)
    setSaveLoading(false)
    setEditingIdea(null)
  }

  function handleDelete(id) {
    if (window.confirm('Delete this gift idea?')) actions.delete(id)
  }

  const categoriesWithCount = GIFT_CATEGORIES.filter((c) =>
    ideas.some((i) => i.category === c)
  )

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Gift Ideas</h1>
          <p className="page-subtitle">Your reusable library of gift inspiration</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowCreate(true)}
        >
          Add Idea
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none" />
          <input
            type="search"
            placeholder="Search ideas…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-stone-200 bg-white pl-9 pr-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-terracotta-400/30 focus:border-terracotta-400 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory('')}
            className={`h-7 px-3 rounded-full text-xs font-medium transition-all ${
              !activeCategory
                ? 'bg-stone-800 text-white'
                : 'bg-cream-200 text-stone-500 hover:bg-cream-300'
            }`}
          >
            All
          </button>
          {categoriesWithCount.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c === activeCategory ? '' : c)}
              className={`h-7 px-3 rounded-full text-xs font-medium transition-all ${
                activeCategory === c
                  ? 'bg-terracotta-500 text-white'
                  : 'bg-cream-200 text-stone-500 hover:bg-cream-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="w-6 h-6" />}
          title={search || activeCategory ? 'No matches found' : 'No gift ideas yet'}
          description={
            search || activeCategory
              ? 'Try adjusting your search or filters.'
              : 'Build a library of gift ideas to reuse across your presents.'
          }
          action={!search && !activeCategory ? { label: 'Add Your First Idea', onClick: () => setShowCreate(true) } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((idea) => (
            <GiftIdeaCard
              key={idea.id}
              idea={idea}
              onEdit={setEditingIdea}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Add gift idea"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={saveLoading} type="submit" form="gift-form-create">
              Save Idea
            </Button>
          </>
        }
      >
        <GiftIdeaForm formId="gift-form-create" onSave={handleCreate} onCancel={() => setShowCreate(false)} loading={saveLoading} />
      </Modal>

      {/* Edit modal */}
      <Modal
        isOpen={!!editingIdea}
        onClose={() => setEditingIdea(null)}
        title="Edit gift idea"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setEditingIdea(null)}>Cancel</Button>
            <Button variant="primary" size="sm" loading={saveLoading} type="submit" form="gift-form-edit">
              Save Changes
            </Button>
          </>
        }
      >
        {editingIdea && (
          <GiftIdeaForm formId="gift-form-edit" initial={editingIdea} onSave={handleEdit} onCancel={() => setEditingIdea(null)} loading={saveLoading} />
        )}
      </Modal>
    </div>
  )
}

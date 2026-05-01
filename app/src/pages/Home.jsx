import { useNavigate } from 'react-router-dom'
import { Gift, Sparkles, Globe, Plus, ArrowRight } from 'lucide-react'
import { usePresents } from '../store'
import { useGifts }    from '../store'
import { Card }        from '../components/ui/Card'
import { Button }      from '../components/ui/Button'
import { Badge }       from '../components/ui/Badge'
import { MOCK_USER }   from '../data/mockData'
import { formatDate }  from '../utils/helpers'
import { PresentStatus } from '../types/models'

function StatCard({ icon: Icon, label, value, accent = false }) {
  return (
    <Card variant={accent ? 'warm' : 'default'} padding="md" className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        accent ? 'bg-terracotta-100' : 'bg-cream-200'
      }`}>
        <Icon className={`w-5 h-5 ${accent ? 'text-terracotta-500' : 'text-stone-400'}`} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-stone-800 leading-none">{value}</p>
        <p className="text-xs text-stone-400 mt-1">{label}</p>
      </div>
    </Card>
  )
}

function PresentRow({ present, onOpen }) {
  const isPublished = present.status === PresentStatus.PUBLISHED
  return (
    <div
      onClick={() => onOpen(present.id)}
      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-cream-200 cursor-pointer transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-cream-200 group-hover:bg-cream-300 flex items-center justify-center shrink-0 transition-colors">
        <Gift className="w-4 h-4 text-stone-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-700 truncate">{present.title}</p>
        <p className="text-xs text-stone-400 truncate">for {present.recipient.name}</p>
      </div>
      <Badge variant={isPublished ? 'success' : 'default'} dot size="sm">
        {isPublished ? 'Published' : 'Draft'}
      </Badge>
      <span className="text-xs text-stone-300">{formatDate(present.updatedAt)}</span>
      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-400 transition-colors shrink-0" />
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { presents, actions } = usePresents()
  const { ideas }             = useGifts()

  const published  = presents.filter((p) => p.status === PresentStatus.PUBLISHED)
  const recent     = [...presents].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5)

  function handleCreatePresent() {
    navigate('/presents')
  }

  function handleOpenBuilder(id) {
    navigate(`/builder/${id}`)
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="page-title">Good morning, {MOCK_USER.name}</h1>
        <p className="page-subtitle">Here's what's happening with your presents.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon={Gift}     label="Total presents" value={presents.length} />
        <StatCard icon={Globe}    label="Published"       value={published.length} accent />
        <StatCard icon={Sparkles} label="Gift ideas"      value={ideas.length} />
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleCreatePresent}
        >
          New Present
        </Button>
        <Button variant="secondary" onClick={() => navigate('/gifts')}>
          Browse Gift Ideas
        </Button>
      </div>

      {/* Recent presents */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-label">Recent Presents</h2>
          <button
            onClick={() => navigate('/presents')}
            className="text-xs text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            View all
          </button>
        </div>

        {recent.length === 0 ? (
          <Card variant="warm" padding="lg" className="text-center">
            <p className="text-sm text-stone-400 mb-3">You haven't created any presents yet.</p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={handleCreatePresent}
            >
              Create your first present
            </Button>
          </Card>
        ) : (
          <Card variant="default" padding="none">
            <div className="p-2">
              {recent.map((present) => (
                <PresentRow
                  key={present.id}
                  present={present}
                  onOpen={handleOpenBuilder}
                />
              ))}
            </div>
          </Card>
        )}
      </section>
    </div>
  )
}

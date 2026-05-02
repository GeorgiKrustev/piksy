import { useEffect, useState } from 'react'
import { Globe, Lock, Copy, Check } from 'lucide-react'
import { Input }  from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Badge }  from '../../../components/ui/Badge'
import { PresentStatus } from '../../../types/models'

export default function PublishStep({ present, actions }) {
  const { setPublishDraft, save, publish, unpublish, goPrev } = actions

  const ps = present.publishSettings
  const [slug,   setSlug]   = useState(ps.slug ?? '')
  const [copied, setCopied] = useState(false)

  const isPublished = present.status === PresentStatus.PUBLISHED
  const shareUrl    = `https://piksy.app/${slug}`

  useEffect(() => {
    setPublishDraft({ slug })
  }, [slug, setPublishDraft])

  function handlePublish() {
    save()
    publish()
  }

  function handleCopy() {
    navigator.clipboard?.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800">Publish & Share</h2>
        <p className="text-sm text-stone-400 mt-0.5">
          Give your present a URL and send it to {present.recipient.name}.
        </p>
      </div>

      {/* Status banner */}
      <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
        isPublished ? 'bg-green-50 border border-green-200' : 'bg-cream-200 border border-stone-100'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isPublished ? 'bg-green-100' : 'bg-cream-300'
        }`}>
          {isPublished
            ? <Globe className="w-4 h-4 text-green-600" />
            : <Lock  className="w-4 h-4 text-stone-400" />
          }
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${isPublished ? 'text-green-700' : 'text-stone-600'}`}>
            {isPublished ? 'Live — anyone with the link can view this' : 'Not published yet'}
          </p>
          {isPublished && ps.publishedAt && (
            <p className="text-xs text-green-600 mt-0.5">
              Published {new Date(ps.publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <Badge variant={isPublished ? 'success' : 'default'} dot>
          {isPublished ? 'Published' : 'Draft'}
        </Badge>
      </div>

      {/* Slug / URL */}
      <div className="flex flex-col gap-5 mb-6">
        <Input
          label="URL slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))}
          helperText="piksy.app / your-slug"
        />

        {isPublished && (
          <div>
            <p className="text-sm font-medium text-stone-700 mb-1.5">Share link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-10 flex items-center px-3 rounded-xl border border-stone-200 bg-cream-50">
                <span className="text-sm text-stone-500 truncate">{shareUrl}</span>
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={handleCopy}
                leftIcon={copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isPublished ? (
          <Button variant="outline" size="md" onClick={unpublish}>Unpublish</Button>
        ) : (
          <Button variant="primary" size="md" leftIcon={<Globe className="w-4 h-4" />} onClick={handlePublish}>
            Publish Present
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={goPrev}>Back</Button>
      </div>
    </div>
  )
}

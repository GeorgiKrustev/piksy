import { useParams } from 'react-router-dom'
import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { useBuilder }    from '../../store'
import { BuilderStep }   from '../../types/models'
import LandingStep       from './steps/LandingStep'
import GiftsStep         from './steps/GiftsStep'
import DetailsStep       from './steps/DetailsStep'
import FinalStep         from './steps/FinalStep'
import PublishStep       from './steps/PublishStep'
import GiftWebsitePreview from './GiftWebsitePreview'

// ---------------------------------------------------------------------------
// Step nav item
// ---------------------------------------------------------------------------

function StepNavItem({ step, index, isActive, isComplete, onClick }) {
  return (
    <button
      onClick={() => onClick(step.id)}
      className={clsx(
        'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors rounded-xl',
        isActive
          ? 'bg-terracotta-50 text-terracotta-700'
          : 'text-stone-500 hover:bg-cream-200 hover:text-stone-700'
      )}
    >
      {/* Number / check */}
      <span className={clsx(
        'mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold',
        isActive   ? 'bg-terracotta-500 text-white' :
        isComplete ? 'bg-stone-200 text-stone-500'  :
                     'bg-cream-200 text-stone-400'
      )}>
        {isComplete && !isActive ? <Check className="w-3 h-3" /> : index + 1}
      </span>

      <span className="min-w-0">
        <span className={clsx('block text-sm font-medium leading-tight', isActive ? 'text-terracotta-700' : '')}>
          {step.label}
        </span>
        <span className="block text-xs text-stone-400 mt-0.5 leading-snug">
          {step.description}
        </span>
      </span>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Step renderer
// ---------------------------------------------------------------------------

function ActiveStepContent({ step, builder }) {
  const { present, draft, actions } = builder
  if (!present) return null

  switch (step) {
    case BuilderStep.LANDING:
      return <LandingStep  present={present} draft={draft} actions={actions} />
    case BuilderStep.GIFTS:
      return <GiftsStep    present={present} actions={actions} />
    case BuilderStep.DETAILS:
      return <DetailsStep  present={present} actions={actions} />
    case BuilderStep.FINAL:
      return <FinalStep    present={present} draft={draft} actions={actions} />
    case BuilderStep.PUBLISH:
      return <PublishStep  present={present} draft={draft} actions={actions} />
    default:
      return null
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BuilderPage() {
  const { id }  = useParams()
  const builder = useBuilder(id)
  const { present, activeStep, stepIndex, steps, actions } = builder

  if (!present) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-stone-400">
        Present not found.
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Step nav */}
      <aside className="w-builderNav shrink-0 bg-white border-r border-stone-100 flex flex-col py-4 overflow-y-auto scrollbar-hide">
        <p className="section-label px-4 mb-3">Steps</p>
        <div className="flex flex-col gap-0.5 px-2">
          {steps.map((step, i) => (
            <StepNavItem
              key={step.id}
              step={step}
              index={i}
              isActive={step.id === activeStep}
              isComplete={i < stepIndex}
              onClick={actions.goToStep}
            />
          ))}
        </div>
      </aside>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-cream-100">
        <ActiveStepContent step={activeStep} builder={builder} />
      </div>

      {/* Preview */}
      <aside className="w-builderPreview shrink-0 bg-white border-l border-stone-100 overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-stone-100">
          <p className="section-label">Preview</p>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide flex items-start justify-center p-4">
          <GiftWebsitePreview present={present} activeStep={activeStep} />
        </div>
      </aside>
    </div>
  )
}

import { useState, useCallback, useMemo } from 'react'
import { presentService } from '../services/presentService'
import { BUILDER_STEPS, BuilderStep } from '../types/models'

export function useBuilder(presentId) {
  const [present, setPresent] = useState(() => presentService.getById(presentId))
  const [activeStep, setActiveStep] = useState(BuilderStep.LANDING)
  const [draft, setDraft] = useState(null) // null = no unsaved changes

  const stepIndex = BUILDER_STEPS.findIndex((s) => s.id === activeStep)
  const isDirty   = draft !== null

  const refreshPresent = useCallback(() => {
    const latest = presentService.getById(presentId)
    setPresent(latest)
    return latest
  }, [presentId])

  // ------------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------------

  const goToStep = useCallback((stepId) => {
    setActiveStep(stepId)
    setDraft(null)
  }, [])

  const goNext = useCallback(() => {
    const next = BUILDER_STEPS[stepIndex + 1]
    if (next) goToStep(next.id)
  }, [stepIndex, goToStep])

  const goPrev = useCallback(() => {
    const prev = BUILDER_STEPS[stepIndex - 1]
    if (prev) goToStep(prev.id)
  }, [stepIndex, goToStep])

  // ------------------------------------------------------------------
  // Draft helpers (each step patches just its slice)
  // ------------------------------------------------------------------

  const setLandingDraft = useCallback((patch) =>
    setDraft((d) => ({ ...d, landingPage: { ...(d?.landingPage ?? present?.landingPage), ...patch } })),
  [present])

  const setFinalDraft = useCallback((patch) =>
    setDraft((d) => ({ ...d, finalScreen: { ...(d?.finalScreen ?? present?.finalScreen), ...patch } })),
  [present])

  const setPublishDraft = useCallback((patch) =>
    setDraft((d) => ({ ...d, publishSettings: { ...(d?.publishSettings ?? present?.publishSettings), ...patch } })),
  [present])

  // ------------------------------------------------------------------
  // Save
  // ------------------------------------------------------------------

  const save = useCallback(() => {
    if (!draft || !present) return
    let updated = present

    if (draft.landingPage)     updated = presentService.updateLandingPage(present.id, draft.landingPage)     ?? updated
    if (draft.finalScreen)     updated = presentService.updateFinalScreen(present.id, draft.finalScreen)     ?? updated
    if (draft.publishSettings) updated = presentService.updatePublishSettings(present.id, draft.publishSettings) ?? updated

    setPresent(updated)
    setDraft(null)
    return updated
  }, [draft, present])

  const saveAndNext = useCallback(() => {
    save()
    goNext()
  }, [save, goNext])

  // ------------------------------------------------------------------
  // Gift option actions — memoized so referential identity is stable
  // ------------------------------------------------------------------

  const giftActions = useMemo(() => ({
    add(data) {
      presentService.addGiftOption(presentId, data)
      refreshPresent()
    },
    update(optionId, updates) {
      presentService.updateGiftOption(presentId, optionId, updates)
      refreshPresent()
    },
    remove(optionId) {
      presentService.removeGiftOption(presentId, optionId)
      refreshPresent()
    },
  }), [presentId, refreshPresent])

  // ------------------------------------------------------------------
  // Publish
  // ------------------------------------------------------------------

  const publish = useCallback(() => {
    save()
    const updated = presentService.publish(presentId)
    setPresent(updated)
  }, [save, presentId])

  const unpublish = useCallback(() => {
    const updated = presentService.unpublish(presentId)
    setPresent(updated)
  }, [presentId])

  return {
    present,
    draft,
    activeStep,
    stepIndex,
    steps: BUILDER_STEPS,
    isDirty,
    actions: {
      goToStep,
      goNext,
      goPrev,
      setLandingDraft,
      setFinalDraft,
      setPublishDraft,
      save,
      saveAndNext,
      publish,
      unpublish,
      gifts: giftActions,
      refresh: refreshPresent,
    },
  }
}

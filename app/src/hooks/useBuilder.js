import { useState, useCallback } from 'react'
import { presentService } from '../services/presentService'
import { BUILDER_STEPS, BuilderStep } from '../types/models'

/**
 * useBuilder — manages the full builder session for one PresentWebsite.
 *
 * Keeps a local draft copy that is synced to storage on every save,
 * so the user never loses work when switching steps.
 *
 * Returns:
 *   present     — latest saved copy from storage
 *   draft       — in-progress local edits for the current step
 *   activeStep  — current BuilderStep id
 *   stepIndex   — 0-based index into BUILDER_STEPS
 *   steps       — BUILDER_STEPS constant (for nav rendering)
 *   isDirty     — whether draft differs from saved
 *   actions     — navigation + save + field-update helpers
 */
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

  const setLandingDraft  = useCallback((patch) =>
    setDraft((d) => ({ ...d, landingPage:  { ...(d?.landingPage  ?? present?.landingPage),  ...patch } })),
  [present])

  const setFinalDraft    = useCallback((patch) =>
    setDraft((d) => ({ ...d, finalScreen:  { ...(d?.finalScreen  ?? present?.finalScreen),  ...patch } })),
  [present])

  const setPublishDraft  = useCallback((patch) =>
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
  // Gift option actions (delegate to service, refresh present)
  // ------------------------------------------------------------------

  const giftActions = {
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
  }

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

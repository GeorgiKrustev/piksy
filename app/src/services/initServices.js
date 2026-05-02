import { storageService } from './storageService'
import { MOCK_PRESENTS }   from '../data/mockData'
import { MOCK_GIFT_IDEAS }  from '../data/mockData'

/**
 * Seeds localStorage with default data on first load.
 * Call once at app startup (main.jsx) before rendering.
 *
 * Migration note: replace this with an API prefetch / auth-gated
 * initialisation when moving to a real backend.
 */
export function initStorage() {
  if (!storageService.get('presents'))   storageService.set('presents',   MOCK_PRESENTS)
  if (!storageService.get('gift_ideas')) storageService.set('gift_ideas', MOCK_GIFT_IDEAS)
}

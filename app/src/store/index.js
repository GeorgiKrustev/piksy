/**
 * Store barrel — the single import point for all app state.
 *
 * Today: re-exports plain custom hooks backed by localStorage.
 *
 * Migration path (no import changes needed in consuming components):
 *   - Wrap with a React Context provider and lift state here.
 *   - Or swap hook implementations for Zustand stores.
 *   - Or replace with React Query / SWR hooks backed by a real API.
 *
 * The shape each hook returns stays constant:
 *   { data, loading, error, actions }
 */

export { usePresents } from '../hooks/usePresents'
export { useGifts }   from '../hooks/useGifts'
export { useBuilder } from '../hooks/useBuilder'

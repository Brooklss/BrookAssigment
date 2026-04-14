import { STORAGE_KEYS, safeRead, safeWrite, safeSessionRead, safeSessionWrite } from './storage'

export function getRecentSearches() {
  const searches = safeRead(STORAGE_KEYS.recentSearches, [])
  return Array.isArray(searches) ? searches : []
}

export function pushRecentSearch(query) {
  const normalized = query.trim()
  if (!normalized) {
    return
  }

  const current = getRecentSearches().filter(
    (entry) => entry.toLowerCase() !== normalized.toLowerCase(),
  )

  const next = [normalized, ...current].slice(0, 3)
  safeWrite(STORAGE_KEYS.recentSearches, next)
}

export function getSessionFilters() {
  const defaults = { search: '', category: 'All' }
  const value = safeSessionRead(STORAGE_KEYS.sessionFilters, defaults)
  if (!value || typeof value !== 'object') {
    return defaults
  }

  return {
    search: typeof value.search === 'string' ? value.search : '',
    category: typeof value.category === 'string' ? value.category : 'All',
  }
}

export function setSessionFilters(filters) {
  safeSessionWrite(STORAGE_KEYS.sessionFilters, filters)
}

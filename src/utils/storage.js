export const STORAGE_KEYS = {
  cart: 'se333_cart',
  orders: 'se333_orders',
  productCache: 'se333_products_cache',
  recentSearches: 'se333_recent_searches',
  sessionFilters: 'se333_session_filters',
}

export function safeRead(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return fallbackValue
    }
    return JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

export function safeWrite(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function safeSessionRead(key, fallbackValue) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) {
      return fallbackValue
    }
    return JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

export function safeSessionWrite(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

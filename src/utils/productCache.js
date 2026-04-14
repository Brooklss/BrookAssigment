import { PRODUCT_SOURCE } from '../data/products'
import { STORAGE_KEYS, safeRead, safeWrite } from './storage'

const PRODUCT_TTL_MS = 5 * 60 * 1000

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function loadProductsWithCache() {
  const cached = safeRead(STORAGE_KEYS.productCache, null)
  const now = Date.now()

  if (cached && Array.isArray(cached.products) && now - cached.timestamp < PRODUCT_TTL_MS) {
    return {
      products: cached.products,
      fromCache: true,
      timestamp: cached.timestamp,
    }
  }

  await wait(500)

  const fresh = {
    products: PRODUCT_SOURCE,
    timestamp: now,
  }

  safeWrite(STORAGE_KEYS.productCache, fresh)

  return {
    products: fresh.products,
    fromCache: false,
    timestamp: fresh.timestamp,
  }
}

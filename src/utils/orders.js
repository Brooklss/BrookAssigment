import { STORAGE_KEYS, safeRead, safeWrite } from './storage'

export function getOrders() {
  const orders = safeRead(STORAGE_KEYS.orders, [])
  return Array.isArray(orders) ? orders : []
}

export function saveOrder(order) {
  const currentOrders = getOrders()
  const nextOrders = [order, ...currentOrders]
  safeWrite(STORAGE_KEYS.orders, nextOrders)
}

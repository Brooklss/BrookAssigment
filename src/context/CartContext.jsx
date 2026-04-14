import { createContext, useContext, useMemo, useState } from 'react'
import { PRODUCT_SOURCE } from '../data/products'
import { STORAGE_KEYS, safeRead, safeWrite } from '../utils/storage'

const CartContext = createContext(null)

function clampQuantity(quantity, stock) {
  return Math.max(1, Math.min(quantity, stock))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = safeRead(STORAGE_KEYS.cart, [])
    return Array.isArray(saved) ? saved : []
  })

  const persistItems = (updater) => {
    setItems((previous) => {
      const next = typeof updater === 'function' ? updater(previous) : updater
      safeWrite(STORAGE_KEYS.cart, next)
      return next
    })
  }

  const addToCart = (product, quantity = 1) => {
    persistItems((previous) => {
      const existing = previous.find((item) => item.productId === product.id)
      if (existing) {
        return previous.map((item) => {
          if (item.productId !== product.id) {
            return item
          }

          const nextQty = clampQuantity(item.quantity + quantity, product.stock)
          return { ...item, quantity: nextQty }
        })
      }

      return [
        ...previous,
        {
          productId: product.id,
          quantity: clampQuantity(quantity, product.stock),
        },
      ]
    })
  }

  const removeFromCart = (productId) => {
    persistItems((previous) => previous.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    const product = PRODUCT_SOURCE.find((entry) => entry.id === productId)
    if (!product) {
      return
    }

    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    persistItems((previous) =>
      previous.map((item) => {
        if (item.productId !== productId) {
          return item
        }

        return {
          ...item,
          quantity: clampQuantity(quantity, product.stock),
        }
      }),
    )
  }

  const clearCart = () => {
    persistItems([])
  }

  const cartDetails = useMemo(() => {
    return items
      .map((item) => {
        const product = PRODUCT_SOURCE.find((entry) => entry.id === item.productId)
        if (!product) {
          return null
        }
        return {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        }
      })
      .filter(Boolean)
  }, [items])

  const cartTotal = useMemo(() => {
    return cartDetails.reduce((sum, item) => sum + item.lineTotal, 0)
  }, [cartDetails])

  const cartCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const value = {
    items,
    cartDetails,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}

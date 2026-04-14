import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { OrderSummary } from '../components/OrderSummary'
import { saveOrder } from '../utils/orders'

const EMPTY_FORM = {
  name: '',
  email: '',
  address: '',
}

export function CheckoutPage() {
  const { cartDetails, cartTotal, clearCart } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState('')

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.'
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }
    if (!form.address.trim()) {
      nextErrors.address = 'Address is required.'
    }
    if (!cartDetails.length) {
      nextErrors.cart = 'Your cart is empty.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      },
      items: cartDetails.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
      total: cartTotal,
    }

    saveOrder(order)
    clearCart()
    setForm(EMPTY_FORM)
    setErrors({})
    setConfirmation(`Order ${order.id} submitted successfully.`)
  }

  return (
    <section className="page two-column">
      <form className="card checkout-form" onSubmit={handleSubmit} noValidate>
        <h1>Checkout</h1>

        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          {errors.name ? <span className="error-text">{errors.name}</span> : null}
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          {errors.email ? <span className="error-text">{errors.email}</span> : null}
        </label>

        <label>
          Address
          <textarea
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            rows="4"
          />
          {errors.address ? <span className="error-text">{errors.address}</span> : null}
        </label>

        {errors.cart ? <p className="error-text">{errors.cart}</p> : null}
        {confirmation ? <p className="success-text">{confirmation}</p> : null}

        <button type="submit" className="primary-btn inline-btn">
          Submit Order
        </button>
      </form>

      <OrderSummary cartDetails={cartDetails} cartTotal={cartTotal} />
    </section>
  )
}

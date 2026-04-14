import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { cartDetails, cartTotal, updateQuantity, removeFromCart } = useCart()

  return (
    <section className="page">
      <div className="page-heading">
        <h1>Your Cart</h1>
        <p>Update quantities, remove products, and proceed to checkout.</p>
      </div>

      {!cartDetails.length ? (
        <section className="card">
          <p>Your cart is empty.</p>
          <Link to="/" className="primary-btn inline-btn">
            Browse Products
          </Link>
        </section>
      ) : null}

      {cartDetails.length ? (
        <section className="card">
          <ul className="cart-list">
            {cartDetails.map((item) => (
              <li key={item.product.id}>
                <div>
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price.toFixed(2)} each</p>
                </div>

                <div className="cart-actions">
                  <label>
                    Qty
                    <input
                      type="number"
                      min="0"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.product.id, Number(event.target.value))
                      }
                    />
                  </label>

                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>

                <strong>${item.lineTotal.toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <p className="total-row">
            Total: <strong>${cartTotal.toFixed(2)}</strong>
          </p>

          <Link to="/checkout" className="primary-btn inline-btn">
            Proceed to Checkout
          </Link>
        </section>
      ) : null}
    </section>
  )
}

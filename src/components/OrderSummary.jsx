export function OrderSummary({ cartDetails, cartTotal }) {
  return (
    <section className="card">
      <h2>Order Summary</h2>
      {!cartDetails.length ? <p>Your cart is empty.</p> : null}
      <ul className="summary-list">
        {cartDetails.map((item) => (
          <li key={item.product.id}>
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <strong>${item.lineTotal.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <p className="total-row">
        Total: <strong>${cartTotal.toFixed(2)}</strong>
      </p>
    </section>
  )
}

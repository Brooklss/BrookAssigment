import { useMemo } from 'react'
import { getOrders } from '../utils/orders'

export function OrdersPage() {
  const orders = useMemo(() => getOrders(), [])

  return (
    <section className="page">
      <div className="page-heading">
        <h1>Order History</h1>
        <p>All submitted orders are loaded from localStorage.</p>
      </div>

      {!orders.length ? (
        <section className="card">
          <p>No orders found.</p>
        </section>
      ) : null}

      <div className="orders-grid">
        {orders.map((order) => (
          <article className="card" key={order.id}>
            <h2>{order.id}</h2>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <ul className="summary-list">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <strong>${item.lineTotal.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
            <p className="total-row">
              Total: <strong>${order.total.toFixed(2)}</strong>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCT_SOURCE } from '../data/products'

export function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const productId = Number(id)
  const product = PRODUCT_SOURCE.find((entry) => entry.id === productId)

  if (!product) {
    return (
      <section className="page card">
        <h1>Product Not Found</h1>
        <p>The product you requested does not exist.</p>
        <Link to="/" className="primary-btn inline-btn">
          Back to Home
        </Link>
      </section>
    )
  }

  return (
    <section className="page">
      <article className="details-layout card">
        <img src={product.image} alt={product.name} className="details-image" />

        <div className="details-content">
          <h1>{product.name}</h1>
          <p className="category-pill">{product.category}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className={product.stock > 0 ? 'stock in-stock' : 'stock out-of-stock'}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
          <p className="description">{product.description}</p>

          <button
            type="button"
            className="primary-btn inline-btn"
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </section>
  )
}

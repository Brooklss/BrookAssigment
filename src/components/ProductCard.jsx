import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-content">
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="sku">SKU: CS-{String(product.id).padStart(3, '0')}</p>
        <p className="category-pill">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className={product.stock > 0 ? 'stock in-stock' : 'stock out-of-stock'}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>
      </div>

      <button
        type="button"
        className="primary-btn"
        onClick={() => addToCart(product, 1)}
        disabled={product.stock === 0}
      >
        Deploy to Cart
      </button>
    </article>
  )
}

import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="site-header">
      <div className="brand-row">
        <Link to="/" className="brand">
          Brook's Voult
        </Link>
        <p className="tagline">Minimal e-commerce dashboard</p>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <NavLink to="/orders">Order History</NavLink>
      </nav>
    </header>
  )
}

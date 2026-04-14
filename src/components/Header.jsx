import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="site-header">
      <div className="brand-row">
        <div>
          <p className="terminal-label">root@brooks-voult:~$ storefront --boot</p>
          <Link to="/" className="brand">
            Brook's Vault
          </Link>
        </div>
        <p className="tagline">Geek gear for coders, makers, and security nerds.</p>
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

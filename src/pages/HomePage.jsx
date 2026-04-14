import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { RecentSearches } from '../components/RecentSearches'
import { loadProductsWithCache } from '../utils/productCache'
import {
  getRecentSearches,
  getSessionFilters,
  pushRecentSearch,
  setSessionFilters,
} from '../utils/searchCache'

export function HomePage() {
  const initialFilters = getSessionFilters()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialFilters.search)
  const [category, setCategory] = useState(initialFilters.category)
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches())

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      setLoading(true)
      const result = await loadProductsWithCache()
      if (isMounted) {
        setProducts(result.products)
        setLoading(false)
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setSessionFilters({ search, category })
  }, [search, category])

  useEffect(() => {
    const query = search.trim()
    if (query.length < 2) {
      return
    }
    pushRecentSearch(query)
    setRecentSearches(getRecentSearches())
  }, [search])

  const categories = useMemo(() => {
    const values = [...new Set(products.map((product) => product.category))]
    return ['All', ...values]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  return (
    <section className="page">
      <div className="page-heading">
        <h1>Product Catalog</h1>
        <p>Discover products, filter instantly, and add items to your cart.</p>
      </div>

      <section className="toolbar card">
        <label>
          Search by name
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type product name..."
          />
        </label>

        <label>
          Filter by category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <RecentSearches recentSearches={recentSearches} onSelect={setSearch} />
      </section>

      {loading ? <p className="status">Loading products...</p> : null}
      {!loading && filteredProducts.length === 0 ? (
        <p className="status">No products match your current search/filter.</p>
      ) : null}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

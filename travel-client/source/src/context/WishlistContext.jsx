import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  function addToWishlist(item) {
    setWishlist((prev) => {
      if (prev.find((w) => w.id === item.id && w.type === item.type)) return prev
      return [...prev, item]
    })
  }

  function removeFromWishlist(id, type) {
    setWishlist((prev) => prev.filter((w) => !(w.id === id && w.type === type)))
  }

  function isInWishlist(id, type) {
    return wishlist.some((w) => w.id === id && w.type === type)
  }

  function toggleWishlist(item) {
    if (isInWishlist(item.id, item.type)) {
      removeFromWishlist(item.id, item.type)
    } else {
      addToWishlist(item)
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

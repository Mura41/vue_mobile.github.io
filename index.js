import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    favorites: [],
    cart: []
  }),
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')
    },
    setFavorites(favorites) {
      this.favorites = favorites
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
    addToFavorites(item) {
      this.favorites.push(item)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    removeFromFavorites(itemId) {
      this.favorites = this.favorites.filter((item) => item.id !== itemId)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    setCart(cart) {
      this.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    addToCart(item) {
      this.cart.push(item)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    logout() {
      this.clearUser()
      this.setFavorites([])
      this.setCart([])
      localStorage.removeItem('favorites')
      localStorage.removeItem('cart')
    },
    restoreState() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.user = user
      }
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      if (favorites) {
        this.favorites = favorites
      }
      const cart = JSON.parse(localStorage.getItem('cart'))
      if (cart) {
        this.cart = cart
      }
    }
  }
})

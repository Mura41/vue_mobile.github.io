// userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null
  }),
  actions: {
    login(name) {
      this.username = name
    },
    logout() {
      this.username = null
    }
  }
})

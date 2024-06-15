// userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: null,
    email: null
  }),
  actions: {
    login(name, email) {
      this.userName = name
      this.email = email
    },
    logout() {
      this.userName = null
      this.email = null
    },
    updateUser({ userName, email }) {
      this.userName = userName
      this.email = email
    }
  }
})

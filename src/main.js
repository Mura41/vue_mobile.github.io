import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorite.vue'
import Product from './pages/Product.vue'
import Register from './components/User.vue'
import EditUser from './components/EditUser.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/register', name: 'Register', component: Register },
  { path: '/edit-profile', name: 'EditUser', component: EditUser }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')

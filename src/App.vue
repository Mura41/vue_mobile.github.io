<script setup>
import { ref, provide, watch, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  const existingItem = cart.value.find((cartItem) => cartItem.id === item.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
  item.isAdded = true
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex((cartItem) => cartItem.id === item.id)
  if (index !== -1) {
    cart.value.splice(index, 1)
    item.isAdded = false
  }
}

const increaseItemQuantity = (id) => {
  const item = cart.value.find((cartItem) => cartItem.id === id)
  if (item) {
    item.quantity++
  }
}

const decreaseItemQuantity = (id) => {
  const item = cart.value.find((cartItem) => cartItem.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity
})
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

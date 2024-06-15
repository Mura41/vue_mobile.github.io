<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart, increaseItemQuantity, decreaseItemQuantity } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      :quantity="item.quantity"
      @onClickRemove="() => removeFromCart(item)"
      @increaseQuantity="increaseItemQuantity(item.id)"
      @decreaseQuantity="decreaseItemQuantity(item.id)"
    />
  </div>
</template>

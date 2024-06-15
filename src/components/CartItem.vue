<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex items-center justify-between mt-2">
        <b class="flex-1">{{ price }} руб.</b>
        <div class="flex items-center gap-2">
          <button @click="decreaseQuantity" class="quantity-button">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity" class="quantity-button">+</button>
          <img
            @click="handleRemove"
            class="opacity-40 hover:opacity-200 cursor-pointer transition"
            src="/close.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  quantity: Number
})

const emit = defineEmits(['onClickRemove'])

const increaseQuantity = () => {
  emit('increaseQuantity', props.id)
}

const decreaseQuantity = () => {
  if (props.quantity > 1) {
    emit('decreaseQuantity', props.id)
  }
}

const handleRemove = () => {
  emit('onClickRemove')
}
</script>

<style scoped>
.quantity-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
}
</style>

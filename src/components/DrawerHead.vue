<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="flex items-center justify-between mb-4 sm:mb-8">
    <svg
      @click="closeDrawer"
      class="w-8 h-8 sm:w-10 sm:h-10 opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1 ml-2 sm:ml-4"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2 class="text-lg font-bold sm:text-2xl text-center flex-1">Корзина</h2>
   
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg); 
}
</style>

<script setup>
import { computed } from 'vue'
import Card from './Card.vue'

const props = defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'removeFromFavorite', 'addToCart'])

const handleAddToCart = (item) => {
  emit('addToCart', item)
}

const handleAddToFavorite = (item) => {
  if (item.isFavorite) {
    emit('removeFromFavorite', item)
  } else {
    emit('addToFavorite', item)
  }
}

// Фильтрация продуктов, у которых нет цены или изображения
const filteredItems = computed(() => {
  return props.items.filter((item) => item.price && item.imageUrl)
})

console.log('Original items:', props.items)
console.log('Filtered items:', filteredItems.value)
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in filteredItems"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      @onClickAdd="handleAddToCart(item)"
      @onClickFavorite="handleAddToFavorite(item)"
    />
  </div>
</template>

<style scoped>
.card {
  font-family: 'Roboto', sans-serif;
}

.product-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700; /* Bold */
}

.product-price {
  font-family: 'Roboto', sans-serif;
  font-weight: 400; /* Regular */
}
</style>

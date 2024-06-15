<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" v-auto-animate>
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
</script>

<style scoped>
.card {
  font-family: 'Roboto', sans-serif;
  padding: 16px;
  border: 1px solid #ddd;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-bottom: 8px;
}

.product-price {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-bottom: 16px;
}

/* Адаптивные стили */
@media screen and (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media screen and (min-width: 641px) and (max-width: 767px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media screen and (min-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>

<script setup>
import Card from './Card.vue'

defineProps({
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
</script>

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

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
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

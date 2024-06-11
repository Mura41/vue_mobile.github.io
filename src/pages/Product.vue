<template>
  <router-link to="/">
    <div class="product-page">
      <h2 class="text-3xl font-bold mb-8">{{ product.title }}</h2>
      <img :src="product.imageUrl" alt="Product Image" class="product-image" />
      <div class="product-details">
        <label>
          Цвет:
          <select v-model="selectedColor">
            <option v-for="color in product.colors" :key="color" :value="color">{{ color }}</option>
          </select>
        </label>
        <label>
          Объем памяти:
          <select v-model="selectedMemory" @change="updatePrice">
            <option v-for="memory in product.memoryOptions" :key="memory.size" :value="memory.size">
              {{ memory.size }} GB
            </option>
          </select>
        </label>
        <p class="product-price">{{ calculatedPrice }} руб.</p>
        <button @click="addToCart">
          <img :src="isAdded ? '/check.svg' : '/plus.svg'" alt="Cart" />
          {{ isAdded ? 'В корзине' : 'Добавить в корзину' }}
        </button>
        <button @click="addToFavorite">
          <img :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" />
          {{ isFavorite ? 'В избранном' : 'Добавить в избранное' }}
        </button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)
const selectedColor = ref('')
const selectedMemory = ref('')
const isFavorite = ref(false)
const isAdded = ref(false)
const calculatedPrice = ref(0)

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://ed773693ede49f2e.mokky.dev/items/${route.params.id}`)
    product.value = data
    selectedColor.value = data.colors[0]
    selectedMemory.value = data.memoryOptions[0].size
    calculatedPrice.value = data.memoryOptions[0].price
  } catch (err) {
    console.log(err)
  }
}

const updatePrice = () => {
  const memoryOption = product.value.memoryOptions.find(
    (option) => option.size === selectedMemory.value
  )
  calculatedPrice.value = memoryOption.price
}

const addToCart = () => {
  isAdded.value = !isAdded.value
  // Здесь добавьте логику добавления в корзину
}

const addToFavorite = async () => {
  try {
    if (!isFavorite.value) {
      const obj = {
        item_id: product.value.id
      }

      isFavorite.value = true
      const { data } = await axios.post(`https://ed773693ede49f2e.mokky.dev/favorites`, obj)
      product.value.favoriteId = data.id
    } else {
      isFavorite.value = false
      await axios.delete(`https://ed773693ede49f2e.mokky.dev/favorites/${product.value.favoriteId}`)
      product.value.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(fetchProduct)
</script>

<style scoped>
.product-page {
  font-family: 'Roboto', sans-serif;
}

.product-image {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-price {
  font-weight: 700;
  font-size: 1.5rem;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { inject } from 'vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const favorites = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(
      'https://ed773693ede49f2e.mokky.dev/favorites?_relations=items'
    )

    favorites.value = data.map((obj) => ({
      ...obj.item,
      isFavorite: true,
      favoriteId: obj.id,
      isAdded: cart.value.some((cartItem) => cartItem.id === obj.item.id)
    }))
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://ed773693ede49f2e.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://ed773693ede49f2e.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null

      // Удаление из списка избранного
      favorites.value = favorites.value.filter((fav) => fav.id !== item.id)
    }
  } catch (err) {
    console.log(err)
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchFavorites()
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Избранное</h2>

  <CardList
    :items="favorites"
    is-favorites
    @addToFavorite="addToFavorite"
    @removeFromFavorite="addToFavorite"
    @addToCart="onClickAddPlus"
  />
</template>

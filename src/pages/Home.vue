<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = ref({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.value.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.value.searchQuery = event.target.value
}, 300)

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
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://ed773693ede49f2e.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.value.sortBy
    }

    if (filters.value.searchQuery) {
      params.title = `*${filters.value.searchQuery}*`
    }

    const { data } = await axios.get(`https://ed773693ede49f2e.mokky.dev/items`, {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: cart.value.some((cartItem) => cartItem.id === obj.id)
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters.value, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center flex-col md:flex-row"> <!-- Для мобильных: столбец, для больших экранов: строка -->
    <h2 class="text-3xl font-bold mb-8 md:mb-0">Все товары</h2> <!-- Оставляем отступ только для больших экранов -->

    <div class="flex gap-4 w-full md:w-auto"> <!-- Расстояние между элементами. На мобильных все элементы располагаются в одну строку -->
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none w-full md:w-auto">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative flex-1 md:flex-initial"> <!-- Расстояние от правого края, слева поиск и остается место для селектора на больших экранах -->
        <img class="absolute left-4 top-3 w-4 md:w-auto" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 w-full md:w-auto"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList
      :items="items"
      @addToFavorite="addToFavorite"
      @removeFromFavorite="addToFavorite"
      @addToCart="onClickAddPlus"
      @removeFromCart="onClickAddPlus"
    />
  </div>
</template>

<style scoped>
/* Остальные стили остаются без изменений */
</style>

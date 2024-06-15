<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
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
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
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
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://ed773693ede49f2e.mokky.dev/items`, {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
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

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 class="text-3xl font-bold mt-8 mb-4">Все товары</h2>

    <div class="w-full px-4 mb-4">
      <select @change="onChangeSelect" class="w-full py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
    </div>

    <div class="relative w-full mb-8">
      <img class="absolute left-4 top-3" src="/search.svg" />
      <input
        @input="onChangeSearchInput"
        class="w-full border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
        type="text"
        placeholder="Поиск..."
      />
    </div>

    <div class="w-full">
      <CardList
        :items="items"
        @addToFavorite="addToFavorite"
        @removeFromFavorite="addToFavorite"
        @addToCart="onClickAddPlus"
      />
    </div>
  </div>
</template>

<style scoped>
/* Стили для мобильных устройств */
@media screen and (max-width: 640px) {
  .text-3xl {
    font-size: 2rem; /* Уменьшение размера заголовка */
    margin-top: 4px; /* Уменьшение отступа сверху */
  }

  .mb-8 {
    margin-bottom: 2rem; /* Увеличение отступа снизу */
  }

  .px-4 {
    padding-left: 1rem; /* Уменьшение внутренних отступов */
    padding-right: 1rem;
  }

  .mb-4 {
    margin-bottom: 1.5rem; /* Увеличение отступа снизу */
  }

  .w-full {
    width: 100%; /* Растягивание элемента на всю ширину экрана */
  }

  .absolute {
    left: 1rem; /* Позиционирование левой иконки поиска */
    top: 0.75rem;
  }

  .border {
    border-width: 1px; /* Увеличение толщины границы */
  }

  .py-2 {
    padding-top: 0.5rem; /* Уменьшение вертикальных внутренних отступов */
    padding-bottom: 0.5rem;
  }

  .pl-11 {
    padding-left: 2.75rem; /* Увеличение внутренних отступов слева */
  }

  .pr-4 {
    padding-right: 1rem; /* Уменьшение внутренних отступов справа */
  }

  .outline-none {
    outline: none; /* Удаление обводки при фокусе */
  }

  .focus:border-gray-400:focus {
    border-color: #cbd5e0; /* Цвет обводки при фокусе */
  }
}
</style>

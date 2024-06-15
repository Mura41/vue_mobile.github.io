<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все товары</h2>

    <div class="flex gap-4 items-center">
      <!-- Исправление стиля для селекта -->
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none text-sm">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3 w-4" src="/search.svg" />
        <!-- Исправление стиля для поля ввода -->
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 text-sm"
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
      @removeaddToCard="onClickAddChecked"
    />
  </div>
</template>

<style scoped>
/* Добавьте свои стили здесь */
</style>

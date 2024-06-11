<template>
  <div class="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6">Редактировать профиль</h2>
    <form @submit.prevent="updateUserProfile">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Имя пользователя</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Электронная почта</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
      >
        Сохранить изменения
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const username = ref(userStore.userName)
const email = ref(userStore.email)

const updateUserProfile = () => {
  userStore.updateUser({ userName: username.value, email: email.value })
  router.push('/')
}
</script>

<style scoped>
/* Ваши стили, если необходимо */
</style>

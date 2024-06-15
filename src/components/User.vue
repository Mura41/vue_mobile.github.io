<template>
  <div class="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6" v-if="!isLogin">Регистрация</h2>
    <h2 class="text-2xl font-bold mb-6" v-else>Вход</h2>
    <form @submit.prevent="isLogin ? loginUser() : registerUser()">
      <div class="mb-4" v-if="!isLogin">
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
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
      >
        {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </button>
    </form>
    <p class="mt-4">
      <a @click="toggleMode" class="text-indigo-600 cursor-pointer">
        {{ isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите' }}
      </a>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const isLogin = ref(false)

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const registerUser = async () => {
  try {
    // Логика регистрации пользователя на вашем сервере
    // Пример для демонстрации
    // При успешной регистрации вызываем login с именем пользователя
    userStore.login(username.value)

    // Перенаправление на главную страницу после успешной регистрации
    router.push('/')
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
  }
}

const loginUser = async () => {
  try {
    // Логика входа пользователя на вашем сервере
    // Пример для демонстрации
    // При успешном входе вызываем login с именем пользователя
    userStore.login(username.value)

    // Перенаправление на главную страницу после успешного входа
    router.push('/')
  } catch (error) {
    console.error('Ошибка при входе:', error)
  }
}
</script>

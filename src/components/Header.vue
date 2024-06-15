<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useUserStore } from '../userStore'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])

const userStore = useUserStore()
const userName = computed(() => userStore.userName)
const isLoggedIn = computed(() => !!userStore.userName)

const isProfileMenuOpen = ref(false)
const router = useRouter()

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const editProfile = () => {
  router.push('/edit-profile')
}

const logout = () => {
  userStore.logout()
}

watchEffect(() => {
  console.log('UserName changed:', userName.value)
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Mobile</h2>
          <p class="text-slate-400">Магазин смартфонов</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Избранное</span>
        </li>
      </router-link>

      <div v-if="isLoggedIn" class="relative">
        <li
          @click="toggleProfileMenu"
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <img src="/profile.svg" alt="Profile" />
          <span>{{ userName }}</span>
        </li>
        <ul
          v-if="isProfileMenuOpen"
          class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg"
        >
          <li @click="editProfile" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
            Редактировать профиль
          </li>
          <li @click="logout" class="px-4 py-2 cursor-pointer hover:bg-gray-100">Выйти</li>
        </ul>
      </div>

      <router-link v-else to="/register">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Регистрация</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<style scoped>
/* Добавьте свои стили здесь */
</style>

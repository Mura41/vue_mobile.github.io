<script setup>
import { ref, computed } from 'vue'
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
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-200 px-4 py-3 sm:px-10 sm:py-4">
    <router-link to="/" class="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" class="w-8 sm:w-10" />
      <div>
        <h2 class="text-base sm:text-xl font-bold uppercase">Vue Mobile</h2>
        <p class="text-xs sm:text-slate-400">Магазин смартфонов</p>
      </div>
    </router-link>

    <div class="flex items-center gap-4">
      <ul class="flex items-center gap-6">
        <li
          @click="emit('openDrawer')"
          class="flex items-center cursor-pointer text-gray-500 hover:text-black"
        >
          <img src="/cart.svg" alt="Cart" class="w-6 sm:w-8" />
          <b class="hidden sm:block">{{ totalPrice }} руб.</b>
        </li>

        <router-link to="/favorites">
          <li class="flex items-center cursor-pointer text-gray-500 hover:text-black">
            <img src="/heart.svg" alt="Favorite" class="w-6 sm:w-8" />
            <span class="hidden sm:block">Избранное</span>
          </li>
        </router-link>
      </ul>

      <div v-if="isLoggedIn" class="relative">
        <div
          @click="toggleProfileMenu"
          class="flex items-center cursor-pointer text-gray-500 hover:text-black"
        >
          <img src="/profile.svg" alt="Profile" class="w-6 sm:w-8" />
          <span class="hidden sm:block">{{ userName }}</span>
        </div>
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
        <div class="flex items-center cursor-pointer text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" class="w-6 sm:w-8" />
          <span class="hidden sm:block">Регистрация</span>
        </div>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
/* Добавьте дополнительные стили здесь */

/* Стили для адаптации на мобильных устройствах */
@media screen and (max-width: 640px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
  }

  .logo {
    margin-bottom: 8px;
  }

  .nav {
    display: none; /* Меню скрывается по умолчанию на мобильных устройствах */
  }

  .icons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
  }

  .nav-list li {
    margin-bottom: 8px;
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 150px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none; /* Скрыть меню профиля по умолчанию */
    z-index: 1000;
  }

  .profile-menu.show {
    display: block; /* Показать меню профиля при клике */
  }

  .profile-menu li {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .profile-menu li:hover {
    background-color: #f0f0f0;
  }
}
</style>

<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

// Поля для ввода данных пользователя
const name = ref('')
const email = ref('')
const phone = ref('')

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post('https://ed773693ede49f2e.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice,
      customer: {
        name: name.value,
        email: email.value,
        phone: phone.value
      }
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.length === 0)
const buttonDisabled = computed(
  () => isCreating.value || cartIsEmpty.value || !name.value || !email.value || !phone.value
)
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 fixed right-0 top-0 z-20 p-8">
      <DrawerHead />

      <div v-if="cartIsEmpty && !orderId" class="flex h-full items-center">
        <InfoBlock
          title="Корзина пустая"
          description="Добавьте хотя бы один товар, чтобы сделать заказ."
          image-url="/package-icon.png"
        />
      </div>
      <div v-else-if="orderId" class="flex h-full items-center">
        <InfoBlock
          title="Заказ оформлен!"
          :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
          image-url="/order-success-icon.png"
        />
      </div>
      <div v-else class="flex flex-col h-full">
        <div class="overflow-y-auto flex-1">
          <CartItemList />
        </div>
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex flex-col gap-4">
            <label>
              Имя:
              <input v-model="name" type="text" class="input-field" />
            </label>
            <label>
              Эл. почта:
              <input v-model="email" type="email" class="input-field" />
            </label>
            <label>
              Номер телефона:
              <input v-model="phone" type="tel" class="input-field" />
            </label>
          </div>

          <div class="flex gap-2 mt-4">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} ₽</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} ₽</b>
          </div>

          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.overflow-y-auto {
  overflow-y: auto;
  max-height: calc(100% - 250px); /* Adjust height as needed */
}
</style>


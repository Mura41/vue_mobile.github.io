<template>
  <div class="card">
    <div class="card-header">
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Favorite"
        @click="toggleFavorite"
        class="favorite-icon"
      />
    </div>
    <img :src="imageUrl" alt="Product Image" class="product-image" />
    <h2 class="product-title">{{ title }}</h2>
    <p class="product-price">{{ price }} руб.</p>
    <div class="buttons">
      <img
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Add to cart"
        @click="toggleAddToCart"
        class="add-to-cart-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean
  },
  methods: {
    toggleFavorite() {
      this.$emit('onClickFavorite', this.id)
    },
    toggleAddToCart() {
      this.$emit('onClickAdd', this.id)
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  text-align: center;
  position: relative;
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-header {
  position: absolute;
  top: 10px;
  left: 10px;
}
.favorite-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
}
.product-title {
  font-weight: 700;
  margin-bottom: 8px;
}
.product-price {
  font-weight: 400;
  margin-bottom: 16px;
}
.buttons {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.add-to-cart-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

/* Адаптивный дизайн */
@media screen and (max-width: 768px) {
  .card {
    margin: 16px 0;
  }
  .product-image {
    margin-bottom: 8px;
  }
  .buttons {
    position: static;
    margin-top: 16px;
  }
  .favorite-icon,
  .add-to-cart-icon {
    width: 32px;
    height: 32px;
  }
}
</style>

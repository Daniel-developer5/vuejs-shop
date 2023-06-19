<template>
  <li class="product-item">
    <img class="img" :src="product.thumbnail" :alt="product.title">
    <h3 class="title">{{ product.title }}</h3>
    <p class="text">{{ product.description }}</p>
    <span class="price">{{ priceCurrency }}</span>
    <button @click="onAdd(product.id)" class="button">
      Add to Cart
      <div class="message" v-if="message">Added ✓</div>
    </button>
  </li>
</template>

<script lang="ts">
import store, { Product, addToCart } from '@/store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  data() {
    return {
      message: false,
      timeout: null,
    }
  },
  methods: {
    onAdd(productId: string) {
      addToCart(store, productId)
      this.message = true

      setTimeout(() => this.message = false, 1000)
    },
  },
  computed: {
    priceCurrency() {
      return `${this.product.price} $`
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../scss/base';

.product-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  border: 1px solid rgba($color: $color-dark, $alpha: 0.5);

  .img {
    height: 160px;
  }

  .text {
    flex-grow: 1;
  }

  .title {
    min-height: 48px;
  }

  .price {
    font-size: 18px;
    font-weight: 600;
    color: $color-dark;
  }

  .button {
    position: relative;

    .message {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $color-green;
    }
  }
}
</style>
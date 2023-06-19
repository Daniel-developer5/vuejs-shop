<template>
  <ul class="product-list">
    <ProductItem
      v-for="product in store.products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import store from '@/store'
import ProductItem from '@/components/ProductItem.vue'

defineComponent({
  name: 'ProductList',
  components: {
    ProductItem,
  },
})
</script>

<style lang="scss" scoped>
  @import '../scss/base';

  .product-list {
    padding: 40px 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $breakpoint-laptop) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>

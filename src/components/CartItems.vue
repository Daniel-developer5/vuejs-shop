<template>
  <ul class="cart-items">
    <CartItem
      v-for="product in store.cartProducts"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import store from '@/store'
import CartItem from '@/components/CartItem.vue'

defineComponent({
  name: 'CartList',
  components: {
    CartItem,
  },
})
</script>

<style lang="scss" scoped>
  .cart-items {
    padding: 40px 0;
    display: grid;
    gap: 24px;
  }
</style>
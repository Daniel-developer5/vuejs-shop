<template>
  <header class="header section-padding">
    <div class="container">
      <nav>
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/cart">
          Cart
          <span v-if="cartLabel" class="cart-label">{{ cartLabel }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import store, { getTotalAmount } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  data() {
    return { amount: 0 }
  },
  computed: {
    cartLabel() {
      const amount = getTotalAmount(store)

      if (amount) {
        if (amount > 9) {
          return '9+'
        }

        return amount
      }

      return null
    },
  },
})
</script>

<style lang="scss" scoped>
  @import '../scss/base';

  .header {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: $color-dark;

    a {
      font-size: 16px;
      transition: ease 0.2s;

      &:hover, &.router-link-exact-active {
        color: $color-blue;
      }
    }

    .divider {
      display: inline-block;
      margin: 0 12px;
    }

    a, .divider {
      color: $color-white;
    }

    .cart-label {
      width: 16px;
      height: 16px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      background: $color-red;
      border-radius: 50%;
      color: $color-white;
      transform: translateY(-5px);
    }
  }
</style>
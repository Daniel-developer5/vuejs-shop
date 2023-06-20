<template>
  <li class="cart-item">
    <img class="img" :src="product.thumbnail" :alt="product.title">
    <div class="info">
      <h3 class="title">{{ product.title }}</h3>
      <span class="price">{{ priceCurrency }}</span>
    </div>
    <input type="number" v-model="amount" @blur="onBlurInput">
    <button class="button" @click="onRemove()">Remove</button>
    <ModalConfirm
      v-if="modal"
      title="Are you sure to remove this from the cart?"
      v-on:confirm="onConfirmRemove"
      v-on:decline="onDecline"
    />
  </li>
</template>

<script lang="ts">
import store, { Product, addToCart, removeFromCart } from '@/store'
import { defineComponent, PropType } from 'vue'
import ModalConfirm from './ModalConfirm.vue'

export default defineComponent({
  name: 'CartItem',
  components: {
    ModalConfirm,
  },
  props: {
    product: {
      type: Object as PropType<Product & { amount: number }>,
      required: true,
    },
  },
  data() {
    const { amount } = { ...this.product }

    return {
      amount,
      modal: false,
    }
  },
  methods: {
    onAdd(productId: string, amount: number) {
      addToCart(store, productId, amount)
    },
    onRemove() {
      this.modal = true
    },
    onConfirmRemove() {
      removeFromCart(store, this.product.id)
      this.modal = false
    },
    onDecline() {
      this.modal = false
    },
    onBlurInput(e: FocusEvent) {
      if ((e.target as HTMLInputElement).value === '') {
        this.amount = 1
      }
    },
  },
  computed: {
    priceCurrency() {
      return `${this.product.price} $`
    },
  },
  watch: {
    amount(newValue: number | string, oldValue: number) {
      if (newValue === '') {
        return
      }
      
      if (newValue !== oldValue) {
        if (+newValue <= 0) {
          this.amount = 1
          
          if (newValue === 0) {
            this.onRemove()
          }

          return
        }

        this.onAdd(this.product.id, this.amount)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
  @import '../scss/base';
  .cart-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 12px;
    border: 1px solid rgba($color: $color-dark, $alpha: 0.5);

    @media (min-width: $breakpoint-tablet) {
      flex-wrap: nowrap;
    }

    .img {
      width: 100px;
      height: 100px;
      display: block;
      margin-right: 16px;
    }

    .info {
      width: 100%;
      flex-grow: 1;
      margin: 16px 0;

      @media (min-width: $breakpoint-tablet) {
        margin: 0;
      }

      .price {
        display: block;
        margin-top: 10px;
        font-size: 18px;
        font-weight: 600;
        color: $color-dark;
      }
    }

    input {
      max-width: 80px;
      margin-right: 20px;
      padding: 16px 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px 0px $color-dark;
      border: none;
    }

    button {
      border-radius: 10px;
    }
  }
</style>
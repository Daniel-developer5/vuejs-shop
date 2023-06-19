<template>
  <div class="cart-page section-padding">
    <div class="container">
      <PageTitle title="Your Cart" />
      <div v-if="store.cartProducts.length">
        <CartItems />
        <div class="total">
          <span class="label">Total:</span>
          <span class="price">{{ store.total }} $</span>
        </div>
        <button @click="buy" class="button buy-button">Buy</button>
      </div>
      <p class="empty" v-else>
        No products.
        <router-link to="/">Start shopping</router-link>
      </p>
    </div>
    <ModalConfirm
      v-if="modal"
      :title="modal"
      v-on:decline="onDecline"
      decline-text="Ok"
      just-info
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import CartItems from '@/components/CartItems.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import store from '@/store'
import { errorMsg } from '@/store/messages'

interface FetchPost {
  method: 'POST',
  headers: {
    [key: string]: string,
  },
  body: string,
}

const fakeFetch = (url: string, options?: FetchPost) => {
  return new Promise<Response>((res, rej) => {
    res({
      json() {
        return Promise.resolve({})
      },
    } as Response)
  })
}

export default defineComponent({
  name: 'CartView',
  components: {
    PageTitle,
    CartItems,
    ModalConfirm
  },
  data() {
    return { store, modal: '', }
  },
  methods: {
    onDecline() {
      this.modal = ''
    },
    buy() {
      /* Use real `fetch` function to make requests */
      fakeFetch(`${window.origin}/buy`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          store.cartProducts.map(({ id, title, price, amount }) => ({ id, title, price, amount }))
        )
      })
        .then(res => res.json())
        .then(() => {
          this.modal = 'Success!'
          store.cartProducts = []
        })
        .catch(() => {
          this.modal = errorMsg
        })
    },
  },
})
</script>

<style lang="scss" scoped>
  @import '../scss/base';

  .total {
    padding: 10px 0;
    font-size: 24px;
    display: flex;
    justify-content: flex-end;

    .label {
      color: $color-dark;
    }

    .price {
      display: block;
      margin-left: 12px;
      font-weight: 600;
    }
  }

  .empty {
    margin-top: 32px;
    font-size: 18px;

    a {
      color: $color-blue;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .buy-button {
    margin-bottom: 40px;
  }
</style>


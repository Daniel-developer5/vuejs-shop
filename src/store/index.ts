import { reactive } from 'vue'

export interface Product {
  readonly id: string,
  title: string,
  description: string,
  price: number,
  thumbnail: string,
}

export interface Cart {
  products: [],
}

interface Store {
  products: Product[],
  cartProducts: Array<Product & { amount: number }>,
  total: number,
}

const store: Store = reactive({
  products: [],
  cartProducts: [],
  total: 0,
})

const findIndex = (store: Store, field: 'products' | 'cartProducts', productId: string) => (
  store[field].findIndex(({ id }) => id === productId)
)

export const addToCart = (store: Store, productId: string, amount?: number) => {
  const index = findIndex(store, 'cartProducts', productId)
  
  if (index >= 0) {
    if (amount) {
      store.cartProducts[index].amount = amount
    } else {
      store.cartProducts[index].amount = store.cartProducts[index].amount + 1
    }
  } else {
    store.cartProducts.push({ ...store.products[findIndex(store, 'products', productId)], amount: 1 })
  }

  store.total = getTotalPrice(store)
}

export const removeFromCart = (store: Store, productId: string) => {
  store.cartProducts = store.cartProducts.filter(({ id }) => id !== productId)

  store.total = getTotalPrice(store)
}

export const getTotalPrice = (store: Store) => (
  store.cartProducts.reduce((total, product) => total + product.price * product.amount, 0)
)

export default store

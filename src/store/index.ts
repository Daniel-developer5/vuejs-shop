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

type cartProducts = Array<Product & { amount: number }>

interface Store {
  products: Product[],
  cartProducts: cartProducts,
  total: number,
}

export const getFromLocalStorage = (): cartProducts | null => {
  const items = window.localStorage.getItem('cartProducts')
  
  if (items) {
    return JSON.parse(items)
  }

  return null
}

export const getTotalFromLocalStorage = (): number | null => {
  const total = window.localStorage.getItem('total')
  
  if (total) {
    if (!isNaN(+total)) {
      return +total
    }
  }

  return null
}

const store: Store = reactive({
  products: [],
  cartProducts: getFromLocalStorage() || [],
  total: getTotalFromLocalStorage() || 0,
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
  saveToLocalStorage(store)
}

export const removeFromCart = (store: Store, productId: string) => {
  store.cartProducts = store.cartProducts.filter(({ id }) => id !== productId)

  store.total = getTotalPrice(store)
  saveToLocalStorage(store)
}

export const getTotalPrice = (store: Store) => (
  store.cartProducts.reduce((total, product) => total + product.price * product.amount, 0)
)

export const getTotalAmount = (store: Store) => (
  store.cartProducts.reduce((total, product) => total + product.amount, 0)
)

export const saveToLocalStorage = (store: Store) => {
  window.localStorage.setItem('cartProducts', JSON.stringify(store.cartProducts))
  window.localStorage.setItem('total', JSON.stringify(store.total))
}

export const clearCart = (store: Store) => {
  store.cartProducts = []
  store.total = 0
  saveToLocalStorage(store)
}

export default store

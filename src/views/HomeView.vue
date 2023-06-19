<template>
  <div class="home section-padding">
    <div class="container">
      <PageTitle title="Our Products" />
      <ProductList v-if="store.products.length" />
      <ChartLoader v-else />
    </div>
    <ModalConfirm v-if="error" :title="errorMsg" just-info />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductList from '@/components/ProductList.vue'
import PageTitle from '@/components/PageTitle.vue'
import ChartLoader from '@/components/ChartLoader.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import store, { Product } from '@/store'
import { errorMsg } from '@/store/messages'

export default defineComponent({
  name: 'HomeView',
  components: {
    ProductList,
    PageTitle,
    ChartLoader,
    ModalConfirm,
  },
  data() {
    return { store, error: false, errorMsg }
  },
  mounted() {
    fetch('https://dummyjson.com/products?limit=12')
      .then(res => res.json())
      .then((data: { products: Product[] }) => store.products = data.products)
      .catch(() => this.error = true)
  }
})
</script>

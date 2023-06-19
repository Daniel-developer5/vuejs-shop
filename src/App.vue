<template>
  <AppHeader />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  name: 'AppView',
  components: {
    AppHeader,
  },
})
</script>

<style lang="scss">
@import './scss/style.scss';
</style>

<template>
  <div>
    <h1>{{ title }}</h1>
    <hr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle',
  props: {
    title: String,
  },
})
</script>

<style lang="scss" scoped>
  @import '../scss/base';

  h1 {
    margin: 36px 0;
  }

  hr {
    border-bottom: 1px solid rgba($color: $color-dark, $alpha: 0.5);
    border-top: none;
  }
</style>
<template>
  <header class="header section-padding">
    <div class="container">
      <nav>
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/cart">Cart</router-link>
      </nav>
    </div>
  </header>
</template>

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
  }
</style>
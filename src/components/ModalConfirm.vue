<template>
  <div class="modal-confirm-overlay">
    <div class="modal-confirm">
      <h4 class="title">{{ title }}</h4>
      <div class="buttons">
        <button v-if="!justInfo" @click="$emit('confirm')" class="button blue">Yes</button>
        <button @click="$emit('decline')" class="button">{{ declineText || 'No' }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalConfirm',
  props: {
    title: String,
    justInfo: Boolean,
    declineText: String,
  },
  mounted() {
    document.body.addEventListener('click', this.onClickBody)
  },
  unmounted() {
    document.body.removeEventListener('click', this.onClickBody)
  },
  methods: {
    onClickBody(e: Event) {
      if ((e.target as HTMLElement).classList.contains('modal-confirm-overlay')) {
        this.$emit('decline')
      }
    }
  },
})
</script>

<style lang="scss">
  @import '../scss/base';

  .modal-confirm-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba($color: $color-dark, $alpha: 0.6);

    .modal-confirm {
      padding: 24px;
      background-color: $color-white;

      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      .buttons {
        display: flex;

        button {
          flex-grow: 1;
          padding-right: 48px;
          padding-left: 48px;
        }

        .button:nth-child(2) {
          margin-left: 12px;
        }
      }
    }
  }
</style>
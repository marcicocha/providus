<template>
  <div
    id="modal-fadeInScale-fs"
    class="modal modal-fx-fadeInScale"
    :class="{ 'is-active': visible }"
  >
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <button
          class="delete custom-close-btn"
          aria-label="close"
          @click="closeModal"
        >
          <i class="fa fa-times"></i>
        </button>
      </header>
      <section class="modal-card-body">
        <p class="modal-card-title">Modal title</p>
        <slot name="content"></slot>
      </section>
      <!-- <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    visible() {
      return this.isVisible
    },
  },
  methods: {
    closeModal() {
      if (this.visible) {
        this.$emit('closeModal')
      }
    },
  },
}
</script>
<style lang="scss">
.modal-card-head {
  justify-content: flex-end;
  .custom-close-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    &:active,
    &:focus {
      border: none;
      outline: none;
    }
    i {
      font-size: 16px;
    }
  }
}
</style>

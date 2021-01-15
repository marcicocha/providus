<template>
  <div
    id="modal-fadeInScale-fs"
    class="modal modal-fx-fadeInScale"
    :class="{ 'is-active': visible }"
  >
    <slot name="modal">
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
          <h1 class="modal-card-title"><slot name="modal-title"></slot></h1>
          <hr />
          <slot name="content"></slot>
        </section>
      </div>
    </slot>
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
  background: #fff;
  border: none;
  border-radius: 0px;
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
.modal-card-body {
  padding: 40px 60px 100px;
}
.modal-card-title {
  font-family: GothamBold;
  font-style: normal;
  font-size: 25px;
  color: #2e434e;
  margin: 0px;
}
hr {
  margin: 10px 0px 25px 0px;
}
</style>

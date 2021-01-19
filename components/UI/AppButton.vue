<template>
  <button
    :class="{
      'is-loading': loading,
      button: true,
      'is-small': size === 'small',
      'is-normal': size === 'normal',
      'is-medium': size === 'medium',
      'is-large': size === 'large',
      'is-fullwidth': block,
      'is-hovered': hover,
      'is-primary': color === 'primary',
      'is-info': color === 'secondary',
      'is-success': color === 'success',
    }"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  components: {},
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'normal',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '#fdb813',
    },
    color: {
      type: String,
      default: 'primary',
    },
    block: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  // computed: {
  //   btnStyle() {
  //     const style = {
  //       'background-color': this.background,
  //       color: this.color,
  //     }
  //     return style
  //   },
  // },
}
</script>
<style lang="scss" scoped>
button {
  border-radius: 0;
  font-size: 16px !important;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
}
@media only screen and (max-width: 991px) {
  button {
    font-size: 13px !important;
  }
}
</style>

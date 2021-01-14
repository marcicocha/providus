<template>
  <button
    :class="{
      'is-loading': loading,
      button: true,
      'is-small': size === 'small',
      'is-normal': size === 'normal',
      'is-medium': size === 'medium',
      'is-large': size === 'large',
    }"
    :disabled="disabled"
    :style="btnStyle"
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
      default: '#fff',
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  computed: {
    btnStyle() {
      const style = {
        'background-color': this.background,
        color: this.color,
      }
      return style
    },
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.innerValue = !newVal ? '' : newVal
      },
      immediate: true,
    },
    innerValue: {
      handler(newVal, oldVal) {
        this.$emit('input', newVal)
      },
      immediate: true,
    },
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', e.target.value)
    },
  },
}
</script>
<style lang="scss" scoped>
button {
  width: inherit;
  height: inherit;
  border-radius: 0;
  font-size: 20px;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  // font-size: 14px;
  line-height: 150%;
  text-align: center;
}
</style>

<template>
  <div class="full-input">
    <label class="checkbox">
      <input
        v-model="innerValue"
        type="checkbox"
        :disabled="disabled"
        @blur="blurHandler"
      />
      {{ label }}
    </label>
  </div>
</template>
<script>
export default {
  name: 'AppCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: false,
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.innerValue = newVal
        } else {
          this.innerValue = undefined
        }
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
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', this.innerValue)
    },
  },
}
</script>
<style lang="scss" scoped>
label {
  width: 100%;
  display: flex;
  font-size: 14px !important;
}
input {
  width: auto;
  margin-right: 15px;
}
.full-input {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}
// input[type='checkbox'] {
//   visibility: hidden;
// }
</style>

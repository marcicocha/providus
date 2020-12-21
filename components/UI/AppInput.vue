<template>
  <!-- <ValidationProvider rules="positive" v-slot="{ errors }"> -->
  <!-- <input v-model="value" type="text" /> -->
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <input
      v-model="innerValue"
      type="text"
      name="name"
      :placeholder="placeholder"
      @blur="blurHandler"
    />
  </div>
  <!-- <span>{{ errors[0] }}</span> -->
  <!-- </ValidationProvider> -->
</template>

<script>
// import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppInput',
  components: {
    // ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerValue: '',
    }
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
.full-input {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #eaeaea;
  width: 100%;
}
input {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: inherit;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  padding: 2px 1px;
}
</style>

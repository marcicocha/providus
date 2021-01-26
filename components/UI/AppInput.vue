<template>
  <!-- <ValidationProvider rules="positive" v-slot="{ errors }"> -->
  <!-- <input v-model="value" type="text" /> -->
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <input
      v-model="innerValue"
      :type="inputType"
      name="name"
      :placeholder="placeholder"
      :disabled="disabled"
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
    inputType: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
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
        if (newVal && (newVal !== '' || newVal.length > 0)) {
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
  padding: 5px 10px;
  border: 1px solid #eaeaea;
  width: 100%;
  margin-bottom: 10px;
  height: 60px;
}
label {
  font-family: 'GothamThin', sans-serif;
}
input {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 155%;
  color: #2e434e;
  padding: 2px 1px;
  width: 100%;
}
@media only screen and (max-width: 991px) {
  input {
    font-size: 13px !important;
    line-height: 195%;
  }
}
@media only screen and (max-width: 600px) {
  label {
    font-size: 10px !important;
  }
}
</style>

<template>
  <!-- <ValidationProvider rules="positive" v-slot="{ errors }"> -->
  <!-- <input v-model="value" type="text" /> -->
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <input
      id="name"
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
    isNumber: {
      type: Boolean,
      default: false,
    },
    isText: {
      type: Boolean,
      default: false,
    },
    isPhone: {
      type: Boolean,
      default: false,
    },
    numberOnlyRegex: {
      type: RegExp,
      default: () => /[^0-9]/g,
    },
    textOnlyRegex: {
      type: RegExp,
      default: () => /[0-9]/g,
    },
    phoneOnlyRegex: {
      type: RegExp,
      default: () => /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
    },
    maxLength: {
      type: [Number, String],
      default: 100,
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
        if (newVal) {
          if (this.isNumber && !this.isText && !this.isPhone) {
            this.innerValue = String(newVal)
              .toUpperCase()
              .slice(0, this.maxLength)
              .replace(this.numberOnlyRegex, '')
          } else if (!this.isNumber && this.isText && !this.isPhone) {
            this.innerValue = String(newVal)
              .toUpperCase()
              .slice(0, this.maxLength)
              .replace(this.textOnlyRegex, '')
          } else if (!this.isNumber && !this.isText && this.isPhone) {
            this.innerValue = String(newVal)
              .toUpperCase()
              .slice(0, 11)
              .replace(this.numberOnlyRegex, '')
          } else {
            this.innerValue = String(newVal)
              .toUpperCase()
              .slice(0, this.maxLength)
          }
        }
        this.$emit('input', this.innerValue)
      },
      immediate: true,
    },
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', this.innerValue)
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
input,
input::before,
input::after {
  -webkit-user-select: initial;
  -moz-user-select: initial;
  -ms-user-select: initial;
  user-select: initial;
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
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    input {
      font-size: 12px !important;
      line-height: 100%;
    }
    .full-input {
      height: 50px;
    }
    label {
      font-size: 11px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    input {
      font-size: 14px !important;
      line-height: 195%;
    }
    .full-input {
      height: 60px;
    }
    label {
      font-size: 13px !important;
    }
  }
}
</style>

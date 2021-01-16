<template>
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <textarea
      v-model="innerValue"
      type="text"
      name="name"
      :placeholder="placeholder"
      :rows="rows"
      cols="50"
      @blur="blurHandler"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  components: {},
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
    rows: {
      type: Number,
      default: 4,
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
  padding: 10px 20px;
  border: 1px solid #eaeaea;
  width: 100%;
  margin-bottom: 15px;
}
label {
  font-family: 'GothamThin', sans-serif;
}
textarea {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  padding: 2px 1px;
  width: 100%;
}
</style>

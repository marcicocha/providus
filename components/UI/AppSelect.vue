<template>
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <select
      v-model="innerValue"
      :name="name"
      :class="{
        'is-loading': fetching,
      }"
      :disabled="disabled"
      @blur="blurHandler"
      @change="changeHandler"
      @focus="searchHandler"
      @select="selectHandler"
    >
      <template v-if="remote">
        <template>
          <option
            v-for="d in dataRemote"
            :key="d.value"
            :title="d.text"
            :value="d.text"
          >
            {{ d.text }}
          </option>
        </template>
      </template>
      <template v-else>
        <template v-if="data && data.length !== ''">
          <option v-for="(i, index) in data" :key="i + '-' + index" :value="i">
            {{ i }}
          </option>
        </template>
      </template>
    </select>
  </div>
</template>
<script>
export default {
  name: 'AppSelect',
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
    remote: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    callBackFunc: {
      type: Function,
      default: () => 1,
    },
    name: {
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
      lastFetchId: 0,
      innerValue: undefined,
      dataRemote: [],
      fetching: false,
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
  created() {
    if (this.value && this.value.length > 0) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', e.target.value)
    },
    changeHandler(e) {
      this.$emit('change', e.target.value)
    },
    searchHandler(e) {
      if (this.remote) {
        this.fetchDataHandler(e.target.value)
      }
    },
    selectHandler(e) {
      this.$emit('select', e.target.value)
    },
    fetchDataHandler(value) {
      if (this.lastFetchId > 0) {
        return
      }
      const callBackFunc = this.callBackFunc
      this.dataRemote = []
      this.fetching = true
      this.$axios
        .$get(this.url)
        .then((body) => {
          if (body.response && Array.isArray(body.response)) {
            const dataRemote = body.response.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
          } else if (!body.response) {
            const dataRemote = body.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
            // this.dataRemote = dataRemote
          } else {
            const dataRemote = body.response.content.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
            // this.dataRemote = dataRemote
          }
          this.fetching = false
          this.lastFetchId += 1
        })
        .catch((err) => {
          console.log(err, 'Error!!')
          this.fetching = false
        })
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
select {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #2e434e;
  padding: 2px 1px;
  width: 100%;
}
</style>

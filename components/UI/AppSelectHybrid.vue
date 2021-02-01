<template>
  <div class="full-input">
    <label for="name">{{ label }}</label>
    <div
      class="custom-select"
      :tabindex="tabindex"
      :disabled="disabled"
      @blur="open = false"
      @click="searchHandler"
    >
      <div class="selected" :class="{ open: open }" @click="open = !open">
        <i
          v-if="fetching"
          class="fas fa-spinner fa-pulse"
          style="color: #fdb813"
        />
        <span>{{ setSelected }}</span>
      </div>
      <div
        v-show="remote"
        ref="lists"
        class="items"
        :class="{
          selectHide: !open,
          'add-border': dataRemote.length > 0,
          dropUpClass: !isInViewPort,
        }"
      >
        <p
          v-for="(option, i) of dataRemote"
          :key="i"
          class="item"
          @click="
            selected = option
            open = false
            $emit('input', option.value)
          "
        >
          {{ option.text }}
        </p>
      </div>
      <div v-show="!remote" class="items" :class="{ selectHide: !open }">
        <template v-if="data && data.length !== ''">
          <p
            v-for="(option, i) of data"
            :key="i"
            class="item"
            @click="
              selected = option
              open = false
              $emit('input', option)
            "
          >
            {{ option }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSelectHybrid',
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
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      lastFetchId: 0,
      innerValue: undefined,
      dataRemote: [],
      fetching: false,

      selected: '',
      open: false,
      listElement: {},
      isInViewPort: false,
    }
  },
  computed: {
    setSelected() {
      return this.value
    },
    listComputed() {
      return this.getPos()
    },
  },
  watch: {
    open: {
      handler(newVal, oldVal) {
        if (newVal && this.$refs.lists && this.dataRemote.length > 0) {
          this.getPos()
        } else if (!newVal && this.$refs.lists) {
          this.$refs.lists.style.display = 'none'
        }
      },
      immediate: true,
    },
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
              this.getPos()
            })
          } else if (!body.response) {
            const dataRemote = body.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
              this.getPos()
            })
            // this.dataRemote = dataRemote
          } else {
            const dataRemote = body.response.content.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
              this.getPos()
            })
            this.dataRemote = dataRemote
          }
          this.fetching = false
          this.lastFetchId += 1
        })
        .catch(() => {
          this.fetching = true
        })
    },
    getPos() {
      if (this.$refs.lists) {
        const el = this.$refs.lists
        el.style.display = ''
        const position = el.getBoundingClientRect()
          ? el.getBoundingClientRect()
          : {}
        const isInViewPort = position.bottom <= window.innerHeight
        this.isInViewPort = isInViewPort
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.full-input {
  display: inline-block;
  border: 1px solid #eaeaea;
  width: 100%;
  margin-bottom: 10px;
  height: 60px;
  label {
    padding: 5px 10px;
  }
}

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 150%;
  line-height: 150%;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #2e434e;
  padding: 2px 1px;
}

.custom-select .selected {
  // background-color: #0a0a0a;
  border-radius: 6px;
  // border: 1px solid #666;
  color: #2e434e;
  // padding: 13px 0px;
  padding-top: 5px;
  padding-right: 1em;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
  min-height: 20px;
}
// .custom-select .selected.open {
//  border: 1px solid #ad8225;
//  border-radius: 6px 6px 0px 0px;
// }

.custom-select .selected::after {
  position: absolute;
  content: '';
  top: 10%;
  right: 10px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #2e434e transparent transparent transparent;
}

.custom-select .items {
  color: #2e434e;
  border-radius: 0px 0px 6px 6px;
  overflow-y: scroll;
  overflow-wrap: anywhere;
  position: absolute;
  // background-color: #fff;
  margin: auto 0px;
  top: 32px;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 200px;
  display: block;
  &::-webkit-scrollbar {
    width: 10px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fdb813;
    // outline: 1px solid slategrey;
    border-radius: 10px;
  }
}
.add-border {
  border: 1px solid #eaeaea;
}
.dropUpClass {
  top: -80px !important;
}
.custom-select .items p {
  color: #2e434e;
  padding-top: 12px;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  background-color: #fff;
  height: auto;
  font-family: 'GothamLight', sans-serif;
}

.custom-select .items p:hover {
  background-color: #f1b100;
  color: #fff;
}

.selectHide {
  display: none;
}
@media only screen and (max-width: 991px) {
  .custom-select {
    font-size: 13px !important;
  }
}
@media only screen and (max-width: 600px) {
  label {
    font-size: 10px !important;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .custom-select {
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
    .custom-select {
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

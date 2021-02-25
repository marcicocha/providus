<template>
  <div class="full-input">
    <div class="file">
      <label class="file-label">
        <input
          ref="file"
          class="file-input"
          type="file"
          name="name"
          @change="newHandleChange"
        />
        <span class="file-cta" :style="{ height: height }">
          <div class="file_label__display">
            <span class="file-icon">
              <img src="@/assets/images/upload.svg" alt="upload icon" />
            </span>
            <span class="file-label">Upload {{ label }} </span>
          </div>
          <slot name="caption">
            <span v-if="file === null"> {{ caption }} </span>
            <span v-if="file !== null" class="file_name">{{ file.name }}</span>
          </slot>
        </span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppUpload',
  props: {
    label: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '4.5em',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    extension: {
      type: Array,
      default: () => ['.jpeg', '.jpg', '.png'],
    },
  },
  data() {
    return {
      file: null,
    }
  },
  methods: {
    extensionHandler(fileName) {
      const extensionStatus = this.extension.find((ext) =>
        fileName.includes(ext)
      )
      return extensionStatus
    },
    newHandleChange() {
      const file = this.$refs.file.files[0]
      if (file === undefined) {
        return
      }
      const extensionStatus = this.extensionHandler(file.name)
      if (extensionStatus && file.size < 3145728) {
        this.file = file
        this.$emit('fileUploadHandler', this.file)
      } else if (file.size > 3145728) {
        this.file = null
        this.$toast.open({
          message: `<p class="toast-msg"> Input File must not be Larger than 635KB' </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
      } else if (!extensionStatus) {
        this.file = null
        this.$toast.open({
          message: `<p class="toast-msg"> You can only upload ${this.extension.toString()} file </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.file-cta {
  background-color: transparent;
  color: #4a4a4a;
  width: 100% !important;
  border: 1px dashed #dcdcdc !important;
  border-radius: 0;
  // min-height: 4.5em;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.file_label__display {
  display: flex;
}
.file-label {
  width: 100%;
}
.file-icon {
  width: 2em;
}
.file_name {
  color: #18c139;
  margin-top: 15px;
}
label {
  opacity: 1;
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
.full-input {
  margin-bottom: 5px;
  width: 100%;
}
@media only screen and (max-width: 991px) {
  label {
    font-size: 13px !important;
  }
}
</style>

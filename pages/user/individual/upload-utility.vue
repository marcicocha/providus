<template>
  <div class="parent-container">
    <AppTitleComponent
      heading="Upload Utility Bill"
      description="Please upload a valid utilily bill not later than 3 months"
    />
    <br />
    <div>
      <button
        :class="{
          button: true,
          'is-fullwidth': true,
          'is-normal': true,
          'is-primary': true,
          'is-outlined': true,
          'outlined-button': true,
        }"
        @click="capturePageHandler"
      >
        <span class="flex_display"
          ><img src="@/assets/images/camera.svg" alt="camera" />
          <span>Capture with Camera</span></span
        >
      </button>
      <br />
      <h4>OR</h4>
      <AppUpload
        label="from Device"
        height="10em"
        @fileUploadHandler="fileUploadHandler"
        @errorMessagehandler="errorMessagehandler"
        ><template slot="caption">
          <ul v-if="!identityFile" class="caption_list">
            <li>ID must take up at least 80% of the image</li>
            <li>Resolution should be above 300 DPI</li>
            <li>Must be a Jpeg</li>
          </ul>
          <p v-if="identityFile" class="file_name">{{ identityFile.name }}</p>
        </template>
      </AppUpload>
      <AppButton
        v-if="identityFile"
        title="Continue"
        @click="submitUploadHandler"
      />
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppUpload from '@/components/UI/AppUpload'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppUpload,
    AppButton,
  },
  data() {
    return {
      idObject: {},
      identityFile: '',
      message: '',
    }
  },
  methods: {
    async submitUploadHandler() {
      try {
        this.message = ''
        const response = this.$cookies.get('requestId')
        const formData = new FormData()
        formData.append('file', this.identityFile)
        formData.append('requestId', response)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        await this.$axios.$post(
          '/individual/utilityBillUpload',
          formData,
          config
        )
        this.$router.replace('/user/individual/upload-document')
      } catch (err) {
        // this.message = err.response.data.errorMessage
      }
    },
    capturePageHandler() {
      this.$router.replace('/user/individual/capture-utility')
    },
    fileUploadHandler(file) {
      this.identityFile = file
      this.message = ''
    },
    errorMessagehandler(message) {
      this.message = message
      this.identityFile = ''
    },
  },
}
</script>
<style lang="scss" scoped>
.parent-container {
  width: 85%;
}
h4 {
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 14px;
}
h4::before,
h4::after {
  background-color: #eaeaea;
  content: '';
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 30%;
}
h4::before {
  right: 0.5em;
  margin-left: -50%;
}
h4::after {
  left: 0.5em;
  margin-right: -50%;
}
.file_name {
  color: #18c139;
  margin-top: 15px;
}
.outlined-button {
  border: 1px solid #fdb813 !important;
  background-color: transparent !important;
  color: #fdb813 !important;
  border-radius: 0;
  font-size: 16px !important;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
  .flex_display {
    display: flex;
    img {
      margin-right: 10px;
    }
  }
}
.caption_list {
  margin-top: 20px;
  li {
    color: #828e95;
    font-weight: 400;
    margin-bottom: 5px;
  }
  li::before {
    content: '-';
    padding-right: 8px;
  }
}
@media only screen and (max-width: 991px) {
  .outlined-button {
    font-size: 13px !important;
  }
  h4 {
    margin-bottom: 20px;
    font-size: 12px;
  }
  .parent-container {
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .parent-container {
    width: 100%;
  }
}
</style>

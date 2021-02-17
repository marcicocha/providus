<template>
  <div class="parent-container">
    <AppTitleComponent
      heading="Upload Valid Id"
      description="Please upload a valid means of Identification. Either International passport, Driver’s license, Permanent Voter’s card or National ID"
    />
    <br />
    <div>
      <!-- <AppSelectHybrid
        v-model="idObject.idType"
        label="Id Type"
        placeholder="Select Identification Type"
        url="/globalData/data?name=ID%20TYPE"
        :call-back-func="
          (resp) => ({
            text: resp,
            value: resp,
          })
        "
      /> -->
      <div class="columns is-mobile">
        <div class="column is-6">
          <AppInput
            v-model="idObject.issuedDate"
            label="Issue Date"
            placeholder="Select Date"
            input-type="date"
          />
        </div>
        <div class="column is-6">
          <AppInput
            v-model="idObject.expiryDate"
            label="Expiry Date"
            placeholder="Select Date"
            input-type="date"
          />
        </div>
      </div>
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
// import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppUpload from '@/components/UI/AppUpload'
import AppButton from '@/components/UI/AppButton'
import AppInput from '@/components/UI/AppInput'
export default {
  components: {
    AppTitleComponent,
    // AppSelectHybrid,
    AppUpload,
    AppButton,
    AppInput,
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
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      try {
        this.message = ''
        const response = this.$cookies.get('requestId')
        const formData = new FormData()
        formData.append('file', this.identityFile)
        formData.append('requestId', response)
        formData.append('issuedDate', this.idObject.issuedDate)
        formData.append('expiryDate', this.idObject.expiryDate)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        await this.$axios.$post('/individual/idCardUpload', formData, config)
        this.$router.replace('/user/individual/upload-utility')
      } catch (err) {
        // this.message = err.response.data.errorMessage
      }
    },
    validationHandler() {
      if (
        this.idObject.expiryDate === undefined ||
        this.idObject.expiryDate === ''
      ) {
        this.$toast.open({
          message: `<p class="toast-msg"> Expiry date is Compulsory </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return true
      }
      if (
        this.idObject.issuedDate === '' ||
        this.idObject.issuedDate === undefined
      ) {
        this.$toast.open({
          message: `<p class="toast-msg">Issue Date is Compulsory</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return true
      }
      const expiryDate = new Date(this.idObject.expiryDate)
      const issuedDate = new Date(this.idObject.issuedDate)
      if (expiryDate <= issuedDate) {
        this.$toast.open({
          message: `<p class="toast-msg">Expiry Date should be greater than Issued date</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return true
      }
      return false
    },
    capturePageHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$cookies.set('idObject', this.idObject)
      this.$router.replace('/user/individual/capture-id')
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

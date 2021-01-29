<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <hr />
      <div>
        <AppUpload
          label="Reference Form"
          extension="pdf"
          @fileUploadHandler="fileUploadReferenceHandler"
          @errorMessagehandler="errorMessagehandler"
        />
        <AppUpload
          label="Signature"
          @fileUploadHandler="fileUploadSignatureHandler"
          @errorMessagehandler="errorMessagehandler"
        />
        <AppButton
          title="Continue"
          :disabled="!signatureFile"
          @click="submitDocumentHandler"
        />
      </div>
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
      referenceFile: null,
      signatureFile: null,
      message: '',
    }
  },
  methods: {
    fileUploadReferenceHandler(file) {
      this.referenceFile = file
      this.message = ''
    },
    fileUploadSignatureHandler(file) {
      this.signatureFile = file
      this.message = ''
    },
    errorMessagehandler(message) {
      this.message = message
    },
    async submitDocumentHandler() {
      try {
        this.message = ''
        const response = this.$cookies.get('requestId')
        console.log(response, 'COOKIE response')
        console.log('clicked')
        const formData = new FormData()
        formData.append('referenceForm1', this.referenceFile)
        formData.append('signature', this.signatureFile)
        formData.append('requestId', response)
        await this.$axios.$post(
          '/individual/referenceAndSignatureUpload',
          formData
        )
        this.$router.replace('/user/individual/liveness-check')
      } catch (err) {
        this.message = err.response.data.errorMessage
      }
    },
  },
}
</script>

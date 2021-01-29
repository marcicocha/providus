<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <hr />
      <div>
        <AppUpload
          label="Reference Form 1 (optional)"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference1Handler"
        />
        <AppUpload
          label="Reference Form 2 (optional)"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference2Handler"
        />
        <AppUpload
          label="Signature"
          @fileUploadHandler="fileUploadSignatureHandler"
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
      referenceFile1: null,
      referenceFile2: null,
      signatureFile: null,
    }
  },
  methods: {
    fileUploadReference1Handler(file) {
      this.referenceFile1 = file
    },
    fileUploadReference2Handler(file) {
      this.referenceFile2 = file
    },
    fileUploadSignatureHandler(file) {
      this.signatureFile = file
    },
    async submitDocumentHandler() {
      if (!this.signatureFile) {
        return
      }
      try {
        this.message = ''
        const response = this.$cookies.get('requestId')
        console.log(response, 'COOKIE response')
        console.log('clicked')
        const formData = new FormData()
        if (this.referenceFile1) {
          formData.append('referenceForm1', this.referenceFile1)
        }
        if (this.referenceFile2) {
          formData.append('referenceForm2', this.referenceFile2)
        }
        formData.append('signature', this.signatureFile)
        formData.append('requestId', response)
        await this.$axios.$post(
          '/individual/referenceAndSignatureUpload',
          formData
        )
        this.$router.replace('/user/individual/liveness-check')
      } catch (err) {
        let errorMessage
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          this.$toast.open({
            message: `<p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
        }
      }
    },
  },
}
</script>

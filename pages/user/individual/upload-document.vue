<template>
  <div>
    <AppTitleComponent heading="Final Steps" />
    <div>
      <hr />
      <div>
        <AppUpload
          :label="accountTypeLabel"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference1Handler"
        />
        <AppUpload
          :label="accountTypeLabel2"
          :extension="['.docx', '.pdf']"
          @fileUploadHandler="fileUploadReference2Handler"
        />
        <AppUpload
          label="Signature"
          @fileUploadHandler="fileUploadSignatureHandler"
        />
        <AppButton
          title="Save &amp; Continue"
          :loading="loading"
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
      loading: false,
    }
  },
  computed: {
    accountTypeLabel() {
      const response = this.$cookies.get('accountType')
      console.log(response, 'SOME RESPONSE')
      if (response === 'CURRENT') {
        return 'Reference Form 1'
      }
      return 'Reference Form 1 (optional)'
    },
    accountTypeLabel2() {
      const response = this.$cookies.get('accountType')
      console.log(response, 'SOME RESPONSE')
      if (response === 'CURRENT') {
        return 'Reference Form 2'
      }
      return 'Reference Form 2 (optional)'
    },
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
        this.$toast.open({
          message: `<p class="toast-msg"> Signature File is Compulsory </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return
      }
      const response = this.$cookies.get('accountType')
      if (response === 'CURRENT') {
        if (!this.referenceFile1) {
          this.$toast.open({
            message: `<p class="toast-msg"> Reference File 1 is Mandatory </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }

        if (!this.referenceFile2) {
          this.$toast.open({
            message: `<p class="toast-msg"> Reference File 2 is Mandatory </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
      }
      try {
        this.message = ''
        this.loading = true
        const response = this.$cookies.get('requestId')
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
        this.loading = false
      } catch (err) {
        this.loading = false
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

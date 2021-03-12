<template>
  <div class="parent_container">
    <AppTitleComponent heading="Capture Selfie" :description="description" />
    <br />
    <AppCaptureInstruction
      v-if="isCaptureInstruction"
      @captureInstructionHandler="captureInstructionHandler"
    />
    <AppCaptureSelfie
      v-if="isCapture"
      :key="counter"
      :form-loading="formLoading"
      @submitCapturehandler="submitCapturehandler"
    />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureInstruction from '@/components/user/individual/capture/AppCaptureInstruction'
import AppCaptureSelfie from '@/components/user/individual/capture/AppCaptureSelfie.vue'
export default {
  components: {
    AppTitleComponent,
    AppCaptureInstruction,
    AppCaptureSelfie,
  },
  data() {
    return {
      description: 'Take a selfie showing your face.',
      isCaptureInstruction: true,
      isCapture: false,
      formLoading: false,
      counter: 0,
    }
  },
  methods: {
    captureInstructionHandler() {
      this.isCaptureInstruction = false
      this.isCapture = true
      this.description = 'Stay still while taking selfie'
      this.counter++
      // 'Stay still and keep your face inside the oval while taking selfie'
    },
    async submitCapturehandler(file) {
      try {
        this.formLoading = true
        const requestId = this.$cookies.get('requestId')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('requestId', requestId)
        await this.$axios.$post('/individual/selfieUpload', formData)
        this.formLoading = false
        this.$router.replace('/user/individual/personal-information')
      } catch (err) {
        this.formLoading = false
        let errorMessage = 'Network Error'
        if (err && !err.response) {
          errorMessage = String(err) + '...please try again'
          this.$toast.open({
            message: `<p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
        // eslint-disable-next-line no-prototype-builtins
        if (err && err.hasOwnProperty('response')) {
          const res = err.response
          // eslint-disable-next-line no-prototype-builtins
          if (res.hasOwnProperty('data')) {
            errorMessage = res.data.errorMessage
            if (!errorMessage) {
              errorMessage =
                'No response was received from the server...please try again'
            }
          } else {
            errorMessage =
              'No response was received from the server...please try again'
          }

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
<style lang="scss" scoped>
.parent_container {
  width: 85%;
  height: 100%;
}
@media only screen and (max-width: 991px) {
  .parent_container {
    width: 100% !important;
    height: 100%;
  }
}
</style>

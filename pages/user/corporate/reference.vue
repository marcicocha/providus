<template>
  <div>
    <AppTitleComponent
      heading="Reference"
      description="Please enter the Reference ID you recieved via Email"
    />
    <br />
    <AppInput
      v-model="referenceCode"
      label="Reference ID"
      placeholder="Enter Reference ID"
      :disabled="isLoading"
      max-length="11"
      min-length="11"
    />
    <div style="height: 20px"></div>
    <AppButton
      title="Submit Reference ID"
      :disabled="!referenceCode"
      :loading="isLoading"
      @click="referenceIdHandler"
    />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppInput,
    AppButton,
  },
  data() {
    return {
      referenceCode: '',
      isLoading: false,
    }
  },
  methods: {
    async referenceIdHandler() {
      try {
        this.isLoading = true
        const response = await this.$axios.$post(
          `/corporate/verifyReferenceCode?referenceCode=${this.referenceCode}`
        )
        if (response) {
          this.$router.replace('/user/corporate/upload-document')
          this.isLoading = false
        }
      } catch (err) {
        this.isLoading = false
        let errorMessage = ''

        // Error Message from Backend
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          if (res === undefined || !res) {
            this.$toast.open({
              message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> No response </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
            return
          }
          errorMessage = res.data.errorMessage

          this.$toast.open({
            message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
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

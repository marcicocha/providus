<template>
  <div>
    <AppTitleComponent :heading="heading" />

    <AppKinForm
      v-if="isBasicDetails"
      :kin-info-object="kinInfoObject"
      @kinDetailsHandler="kinDetailsHandler"
      @errorMessageHandler="errorMessageHandler"
    />
    <AppKinContactForm
      v-if="!isBasicDetails"
      :kin-info-object="kinInfoObject"
      @kinsContactDetailsHandler="kinsContactDetailsHandler"
      @errorMessageHandler="errorMessageHandler"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinForm from '@/components/user/individual/kin-information/AppKinForm'
import AppKinContactForm from '@/components/user/individual/kin-information/AppKinContactForm'
export default {
  components: {
    AppTitleComponent,
    AppKinForm,
    AppKinContactForm,
  },
  data() {
    return {
      kinInfoObject: {},
      isBasicDetails: true,
      heading: 'Next of Kin information',
      message: '',
    }
  },
  methods: {
    kinDetailsHandler() {
      this.heading = 'Next of Kin Contact information'
      this.isBasicDetails = false
    },
    async kinsContactDetailsHandler() {
      try {
        const response = this.$cookies.get('requestId')
        const kinInfoObject = {
          ...this.kinInfoObject,
          requestId: response,
        }
        await this.$axios.$put('/individual/kinDetails', kinInfoObject)
        this.$router.replace('/user/individual/capture-selfie')
      } catch (err) {}
    },
    errorMessageHandler(message) {
      this.message =
        message === 'Year' ? `Must be 18 and Above` : `${message} is compulsory`
      this.$toast.open({
        message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${this.message}</p>`,
        type: 'error',
        duration: 4000,
        dismissible: true,
      })
    },
    ...mapActions({
      submitKinInfoHandler: 'individualModule/POST_KINS_INFORMATION',
    }),
  },
}
</script>

<template>
  <div>
    <a v-if="!isBasicDetails" class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
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
      @changeStateHandler="changeStateHandler"
      @changeCountryHandler="changeCountryHandler"
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
  mounted() {
    const {
      houseNo,
      landmark,
      streetName,
      residentCity,
      saveAddress,
      // residentState,
      // residentLga,
    } = this.$cookies.get('contactDetails')
    if (saveAddress) {
      this.kinInfoObject = {
        ...this.kinInfoObject,
        houseNo,
        landMark: landmark,
        streetName,
        city: residentCity,
        // residentState,
        // residentLga,
      }
    }
  },
  methods: {
    kinDetailsHandler() {
      this.heading = 'Next of Kin Contact information'
      this.isBasicDetails = false
    },
    backButtonHandler() {
      // if (this.isBasicDetails) {
      //   this.$router.replace('/user/individual/contact-information')
      //   return
      // }
      if (!this.isBasicDetails) {
        this.isBasicDetails = true
      }
    },
    changeStateHandler(value) {
      this.kinInfoObject = {
        ...this.kinInfoObject,
        residentState: value,
        residentLga: undefined,
      }
    },
    changeCountryHandler(value) {
      this.kinInfoObject = {
        ...this.kinInfoObject,
        residentCountry: value,
        residentState: undefined,
        residentLga: undefined,
      }
    },
    async kinsContactDetailsHandler() {
      try {
        const response = this.$cookies.get('requestId')
        const kinInfoObject = {
          ...this.kinInfoObject,
          requestId: response,
        }
        await this.$axios.$put('/individual/kinDetails', kinInfoObject)
        this.$cookies.remove('contactDetails')
        this.$router.replace('/user/individual/upload-valid-id')
      } catch (err) {
        let errorMessage = 'Network Error'
        if (String(err).includes('Network')) {
          errorMessage = err
          this.$toast.open({
            message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> Network Error </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          const validationError = res.data.fieldValidationErrors
            ? res.data.fieldValidationErrors
            : []
          if (validationError === [] || !validationError) {
            this.$toast.open({
              message: `<p class="toast-msg"> ${errorMessage} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
            return
          }
          validationError.forEach((element) => {
            this.$toast.open({
              message: `<p class="toast-msg"> ${element.message} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
          })
        }
      }
    },
    errorMessageHandler(message) {
      this.message =
        message === 'Year' ? `Must be 18 and Above` : `${message} is compulsory`
      this.$toast.open({
        message: `<p class="toast-msg"> ${this.message}</p>`,
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
<style lang="scss" scoped>
.back-button {
  span {
    margin-left: 5px;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .back-button {
      font-size: 13px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    .back-button {
      font-size: 1em;
    }
  }
}
</style>

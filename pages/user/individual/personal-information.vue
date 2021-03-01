<template>
  <div>
    <a v-if="!isBasicInformation" class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent heading="Personal Information" />
    <div class="wrap">
      <AppBasicInformation
        v-if="isBasicInformation"
        :personal-info-object="personalInfoObject"
        @basicInfoHandler="basicInfoHandler"
        @errorMessageHandler="errorMessageHandler"
      />
      <AppNationalityInformation
        v-if="isNationalityInfo"
        :nationality-object="nationalityObject"
        @nationalityHandler="nationalityHandler"
        @updateNationalityDetails="updateNationalityDetails"
        @changeStateHandler="changeStateHandler"
        @errorMessageHandler="errorMessageHandler"
        @dualCitizenshipHandler="dualCitizenshipHandler"
      />
      <AppIdentificationNumberInformation
        v-if="isIdentificationInfo"
        :personal-info-object="personalInfoObject"
        @identificationHandler="identificationHandler"
        @errorMessageHandler="errorMessageHandler"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppBasicInformation from '@/components/user/individual/personal-information/AppBasicInformation.vue'
import AppNationalityInformation from '@/components/user/individual/personal-information/AppNationalityInformation.vue'
import AppIdentificationNumberInformation from '@/components/user/individual/personal-information/AppIdentificationNumberInformation.vue'
export default {
  components: {
    AppTitleComponent,
    AppBasicInformation,
    AppNationalityInformation,
    AppIdentificationNumberInformation,
  },
  data() {
    return {
      isBasicInformation: true,
      isNationalityInfo: false,
      isIdentificationInfo: false,
      personalInfoObject: {
        currency: 'NGN',
      },
      nationalityObject: {},
      message: '',
    }
  },
  methods: {
    nationalityHandler() {
      this.isNationalityInfo = false
      this.isIdentificationInfo = true
    },
    updateNationalityDetails(value) {
      this.nationalityObject = {
        nationality: value,
      }
    },
    changeStateHandler(value) {
      this.nationalityObject = {
        ...this.nationalityObject,
        stateOfOrigin: value,
        lga: '',
      }
    },
    dualCitizenshipHandler(value) {
      this.nationalityObject = {
        ...this.nationalityObject,
        altCitizenship: '',
      }
    },
    backButtonHandler() {
      if (this.isNationalityInfo) {
        this.isNationalityInfo = false
        this.isBasicInformation = true
        return
      }
      if (this.isIdentificationInfo) {
        this.isIdentificationInfo = false
        this.isBasicInformation = true
      }
    },
    basicInfoHandler() {
      this.isBasicInformation = false
      this.isNationalityInfo = true
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
    async identificationHandler() {
      if (!this.personalInfoObject) {
        return
      }
      const response = this.$cookies.get('requestId')
      const personalInfoObject = {
        ...this.personalInfoObject,
        ...this.nationalityObject,
        requestId: response,
        foreignNationality:
          this.nationalityObject.nationality === 'FOREIGN' ? 'YES' : 'NO',
      }
      try {
        await this.$axios.$put('/individual/personalInfo', personalInfoObject)
        await this.submitPersonalInfoHandler(personalInfoObject)
        this.$router.replace('/user/individual/contact-information')
      } catch (err) {
        this.message = err.response.data.errorMessage
        let errorMessage
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
    ...mapActions({
      submitPersonalInfoHandler: 'individualModule/POST_PERSONAL_INFORMATION',
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

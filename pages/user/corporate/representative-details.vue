<template>
  <div>
    <AppTitleComponent
      heading="Open a Corporate Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><hr /></div>
      <div v-if="isRC">
        <AppInput
          v-model="rcNo"
          label="RC No"
          placeholder="Enter RC Number"
          :disabled="isLoading"
          max-length="10"
        />
        <div style="height: 20px"></div>
        <AppButton
          title="Submit RC No"
          :disabled="!rcNo"
          :loading="isLoading"
          @click="rcValidationHandler"
        />
        <br />
        <div>
          <p class="reference">
            Have a Reference Number?
            <nuxt-link to="/user/corporate/reference" class="bold"
              >Continue</nuxt-link
            >
          </p>
        </div>
      </div>
      <div v-if="isRepresentative">
        <h2>Representative Details</h2>
        <div>
          <div class="columns is-mobile" style="margin-bottom: 5px">
            <div class="column">
              <AppInput
                v-model="representativeDetails.firstName"
                label="First Name"
                placeholder="Enter First Name"
                is-text
              />
            </div>
            <div class="column">
              <AppInput
                v-model="representativeDetails.surname"
                label="Surname"
                placeholder="Enter Surname"
                is-text
              />
            </div>
          </div>
          <div>
            <AppInput
              v-model="representativeDetails.email"
              label="Email Address"
              placeholder="Enter your Email Address"
            />
          </div>
          <div class="columns is-mobile">
            <div class="column">
              <AppInput
                v-model="representativeDetails.phoneNumber"
                label="Phone Number"
                placeholder="Enter Number"
                is-phone
              />
            </div>
            <div class="column">
              <AppInput
                v-model="representativeDetails.altPhoneNumber"
                label="Alternate Phone Number"
                placeholder="Enter Number"
                is-phone
              />
            </div>
          </div>
        </div>
        <div style="height: 20px"></div>
        <AppButton
          title="Continue"
          :loading="loading"
          @click="representativeSubmitHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
      representativeDetails: {},
      loading: false,
      isRepresentative: false,
      isRC: true,
      rcNo: '',
      isLoading: false,
    }
  },
  methods: {
    async getRequestId(value) {
      try {
        const { response } = await this.$axios.$get(
          `/corporate/getRequestIdByRcNo?rcNo=${value}`
        )
        this.$cookies.set('requestId', response.requestId)
      } catch (err) {
        let errorMessage = 'Network Error'

        // Error Message from Backend
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
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
    async rcValidationHandler() {
      if (!this.rcNo || this.rcNo === undefined || this.rcNo === '') {
        this.$toast.open({
          message: `<p class="toast-msg"> RC field is required to proceed </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return
      }

      this.isLoading = true
      try {
        this.isLoading = true
        const rcNo = {
          rcNo: this.rcNo,
        }
        await this.$axios.$post('/corporate', rcNo)
        await this.submitRcHandler(this.rcNo)
        this.getRequestId(this.rcNo)
        this.isRC = false
        this.isRepresentative = true
        this.isLoading = false
      } catch (err) {
        this.isLoading = false

        let errorMessage = 'Network Error'

        // Network Error
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

        const error = err.response.data.errorMessage

        // Application already completed with RC entered
        if (String(error).toLowerCase().includes('already completed')) {
          errorMessage = error
          this.$toast.open({
            message: `<p class="toast-title">Registration Status</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
            type: 'info',
            duration: 4000,
            dismissible: true,
          })
          return
        }

        // BVN Already Exists
        if (error.includes('already exist')) {
          const { response } = await this.$axios.$get(
            `/corporate/getCurrentWorkFlow?rcNo=${this.rcNo}`
          )
          this.getRequestId(this.rcNo)

          const nextWorkFlow = response.nextWorkFlow
          if (nextWorkFlow === 'COMPANY_DETAILS') {
            this.isRC = false
            this.isRepresentative = true
          }
          if (nextWorkFlow === 'DIRECTOR_DETAILS') {
            this.$router.replace('/user/corporate/director-details')
          }
          if (nextWorkFlow === 'PROPRIETOR_DETAILS') {
            this.$router.replace('/user/corporate/proprietor-details')
          }
          if (nextWorkFlow === 'UPLOADS') {
            this.$router.replace('/user/corporate/upload-document')
          }
          return
        }

        // Error Message from Backend
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
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
    async representativeSubmitHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      try {
        this.loading = true
        await this.submitRepresentativeDetailsHandler(
          this.representativeDetails
        )
        this.$cookies.set('representativeDetails', this.representativeDetails)
        this.$router.replace('/user/corporate/company-details')
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
    validationHandler() {
      if (
        this.representativeDetails.firstName === '' ||
        this.representativeDetails.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.representativeDetails.surname === '' ||
        this.representativeDetails.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.representativeDetails.email === '' ||
        this.representativeDetails.email === undefined
      ) {
        this.errorMessageHandler('Email Address')
        return true
      }
      if (
        this.representativeDetails.phoneNumber === '' ||
        this.representativeDetails.phoneNumber === undefined
      ) {
        this.errorMessageHandler('Phone Number')
        return true
      }
      return false
    },
    errorMessageHandler(message) {
      this.$toast.open({
        message: `<p class="toast-msg"> ${message}</p>`,
        type: 'error',
        duration: 4000,
        dismissible: true,
      })
    },
    ...mapActions({
      submitRepresentativeDetailsHandler:
        'corporateModule/POST_REPRESENTATIVE_DETAILS',
      submitRcHandler: 'individualModule/GET_RC_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
h2 {
  font-family: 'GothamMedium', sans-serif;
  color: #fdb813;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  margin-bottom: 30px;
}
.account-info__block {
  width: 80%;
  padding-top: 30px;
}
hr {
  margin: 2rem 0 !important;
}
@media only screen and (max-width: 991px) {
  .account-info__block {
    width: 100%;
    padding-top: 0;
  }
  hr {
    margin: 1rem 0 !important;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .reference {
      font-size: 14px;
    }
  }
  @media only screen and (min-height: 900px) {
    .reference {
      font-size: 16px;
    }
  }
}
</style>

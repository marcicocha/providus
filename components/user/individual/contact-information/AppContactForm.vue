<template>
  <div>
    <div>
      <div>
        <AppInput
          v-model.trim="contactDetails.email"
          label="Email Address"
          placeholder="Enter your Email Address"
        />
      </div>

      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppInput
            v-model="contactDetails.phoneNumber"
            label="Phone Number"
            placeholder="Enter Number"
            is-phone
            max-length="15"
            min-length="7"
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="contactDetails.altPhoneNumber"
            label="Alt. Phone Number"
            placeholder="Enter Number"
            is-phone
            max-length="15"
            min-length="7"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-4 small-right-padding">
          <AppInput
            v-model="contactDetails.houseNo"
            label="House No."
            placeholder="Enter No."
          />
        </div>
        <div class="column is-8 small-left-padding">
          <AppInput
            v-model="contactDetails.landmark"
            label="Closest Landmark"
            placeholder="Enter Closest Landmark"
            is-text
          />
        </div>
      </div>
      <div class="columns">
        <div class="column small-right-padding">
          <AppInput
            v-model="contactDetails.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
            is-text
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="contactDetails.residentCity"
            label="City/Town"
            placeholder="Enter City or Town"
            is-text
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppSelectHybrid
            v-model="contactDetails.residentState"
            label="State"
            placeholder="Select Option"
            url="/country/states?name=NIGERIA"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
            @change="selectStateHandler"
          />
        </div>
        <div class="column small-left-padding">
          <AppSelectHybrid
            :key="contactDetails.residentState"
            v-model="contactDetails.residentLga"
            label="LGA"
            placeholder="Select Option"
            :url="`/state/lgas?name=${contactDetails.residentState}`"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
      </div>
      <div>
        <AppCheckbox
          v-model="contactDetails.saveAddress"
          label="Use address for kin's address?"
        />
      </div>
    </div>

    <AppButton title="Save &amp; Continue" @click="contactDetailsHandler" />
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import AppInput from '@/components/UI/AppInput'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
import AppCheckbox from '@/components/UI/AppCheckbox.vue'
// import AppSelect from '@/components/UI/AppSelect'

export default {
  name: 'AppContactDetails',
  components: {
    AppSelectHybrid,
    AppInput,
    AppButton,
    AppCheckbox,
    // AppSelect,
  },
  data() {
    return {
      contactDetails: {},
    }
  },
  methods: {
    async contactDetailsHandler() {
      if (
        this.contactDetails.email === '' ||
        this.contactDetails.email === undefined
      ) {
        this.errorHandler('Email')
        return
      }
      if (
        this.contactDetails.phoneNumber === '' ||
        this.contactDetails.phoneNumber === undefined
      ) {
        this.errorHandler('Phone Number')
        return
      }
      if (
        this.contactDetails.houseNo === '' ||
        this.contactDetails.houseNo === undefined
      ) {
        this.errorHandler('House Number')
        return
      }
      if (
        this.contactDetails.landmark === '' ||
        this.contactDetails.landmark === undefined
      ) {
        this.errorHandler('Landmark')
        return
      }
      if (
        this.contactDetails.streetName === '' ||
        this.contactDetails.streetName === undefined
      ) {
        this.errorHandler('Street Name')
        return
      }
      if (
        this.contactDetails.residentCity === '' ||
        this.contactDetails.residentCity === undefined
      ) {
        this.errorHandler('Resident City')
        return
      }
      if (
        this.contactDetails.residentState === '' ||
        this.contactDetails.residentState === undefined
      ) {
        this.errorHandler('Resident State')
        return
      }
      if (
        this.contactDetails.residentLga === '' ||
        this.contactDetails.residentLga === undefined
      ) {
        this.errorHandler('Resident Lga')
        return
      }
      const response = this.$cookies.get('requestId')
      const contactDetails = {
        ...this.contactDetails,
        requestId: response,
      }
      try {
        await this.$axios.$put('/individual/contactDetails', contactDetails)
        // await this.submitContactHandler(contactDetails)
        this.$cookies.set('contactDetails', contactDetails)
        this.$router.replace('/user/individual/kin-information')
      } catch (err) {
        let errorMessage
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          const validationError = res.data.fieldValidationErrors
            ? res.data.fieldValidationErrors
            : []
          if (validationError === []) {
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
    errorHandler(err) {
      this.$toast.open({
        message: `<p class="toast-msg"> ${err} is Compulsory</p>`,
        type: 'error',
        duration: 4000,
        dismissible: true,
      })
    },
    selectStateHandler(value) {
      this.contactDetails = {
        ...this.contactDetails,
        residentState: value,
        residentLga: undefined,
      }
    },
    // ...mapActions({
    //   submitContactHandler: 'individualModule/POST_CONTACT_INFORMATION',
    // }),
  },
}
</script>
<style scoped>
.small-left-padding {
  padding-left: 5px !important;
}
.small-right-padding {
  padding-right: 5px !important;
}
</style>

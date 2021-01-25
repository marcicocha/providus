<template>
  <div>
    <div>
      <div>
        <AppInput
          v-model="contactDetails.email"
          label="Email Address"
          placeholder="Enter Next of Kin's Email Address"
        />
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="contactDetails.phoneNumber"
            label="Phone Number"
            placeholder="Enter Number"
          />
        </div>
        <div class="column">
          <AppInput
            v-model="contactDetails.altPhoneNumber"
            label="Alternate Phone Number"
            placeholder="Enter Number"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-4">
          <AppInput
            v-model="contactDetails.houseNo"
            label="House No."
            placeholder="Enter No."
          />
        </div>
        <div class="column is-8">
          <AppInput
            v-model="contactDetails.landmark"
            label="Closest Landmark"
            placeholder="Enter Closest Landmark"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="contactDetails.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
          />
        </div>
        <div class="column">
          <AppInput
            v-model="contactDetails.city"
            label="City/Town"
            placeholder="Enter City or Town"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <AppSelect
            v-model="contactDetails.residentCountry"
            label="Country"
            placeholder="Select the country of residence of yoour next of Kin"
            url="/country/countryList"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppSelect
            v-model="contactDetails.residentState"
            label="State"
            placeholder="Select Option"
            :url="`/country/states?name=${contactDetails.residentCountry}`"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
        <div class="column">
          <AppSelect
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
    </div>

    <AppButton title="Continue" @click="contactDetailsHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppContactForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
  },
  data() {
    return {
      contactDetails: {},
    }
  },
  methods: {
    contactDetailsHandler() {
      if (!this.contactDetails) {
        return
      }
      this.$emit('kinsContactDetails', this.contactDetails)
      // try {
      //   await this.$axios.$put('/individual/personalInfo', this.contactDetails)
      //   await this.submitKinInfoHandler(this.contactDetails)
      //   this.$router.replace('/user/individual/capture-selfie')
      // } catch (err) {}
    },
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

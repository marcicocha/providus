<template>
  <div>
    <div>
      <div>
        <AppInput
          v-model="kinInfoObject.email"
          label="Email Address"
          placeholder="Enter Next of Kin's Email Address"
        />
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="kinInfoObject.phoneNumber"
            label="Phone Number"
            placeholder="Enter Number"
          />
        </div>
        <div class="column">
          <AppInput
            v-model="kinInfoObject.altPhoneNumber"
            label="Alternate Phone Number"
            placeholder="Enter Number"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-4">
          <AppInput
            v-model="kinInfoObject.houseNo"
            label="House No."
            placeholder="Enter No."
          />
        </div>
        <div class="column is-8">
          <AppInput
            v-model="kinInfoObject.landMark"
            label="Closest Landmark"
            placeholder="Enter Closest Landmark"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="kinInfoObject.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
          />
        </div>
        <div class="column">
          <AppInput
            v-model="kinInfoObject.city"
            label="City/Town"
            placeholder="Enter City or Town"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <AppSelectHybrid
            v-model="kinInfoObject.residentCountry"
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
          <AppSelectHybrid
            :key="kinInfoObject.residentCountry"
            v-model="kinInfoObject.residentState"
            label="State"
            placeholder="Select Option"
            :url="`/country/states?name=${kinInfoObject.residentCountry}`"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
        <div class="column">
          <AppSelectHybrid
            :key="kinInfoObject.residentState"
            v-model="kinInfoObject.residentLga"
            label="LGA"
            placeholder="Select Option"
            :url="`/state/lgas?name=${kinInfoObject.residentState}`"
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

    <AppButton title="Continue" @click="kinsContactDetailsHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppContactForm',
  components: {
    AppSelectHybrid,
    AppInput,
    AppButton,
  },
  props: {
    kinInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    kinsContactDetailsHandler() {
      if (
        this.kinInfoObject.email === undefined ||
        this.kinInfoObject.email === ''
      ) {
        this.$emit('errorMessageHandler', 'Email')
        return
      }
      if (
        this.kinInfoObject.phoneNumber === undefined ||
        this.kinInfoObject.phoneNumber === ''
      ) {
        this.$emit('errorMessageHandler', 'Phone Number')
        return
      }
      if (
        this.kinInfoObject.houseNo === undefined ||
        this.kinInfoObject.houseNo === ''
      ) {
        this.$emit('errorMessageHandler', 'House Number')
        return
      }
      if (
        this.kinInfoObject.landMark === undefined ||
        this.kinInfoObject.landMark === ''
      ) {
        this.$emit('errorMessageHandler', 'Landmark')
        return
      }
      if (
        this.kinInfoObject.streetName === undefined ||
        this.kinInfoObject.streetName === ''
      ) {
        this.$emit('errorMessageHandler', 'Street Name')
        return
      }
      if (
        this.kinInfoObject.city === undefined ||
        this.kinInfoObject.city === ''
      ) {
        this.$emit('errorMessageHandler', 'City')
        return
      }
      if (
        this.kinInfoObject.residentCountry === undefined ||
        this.kinInfoObject.residentCountry === ''
      ) {
        this.$emit('errorMessageHandler', 'Country')
        return
      }
      if (
        this.kinInfoObject.residentState === undefined ||
        this.kinInfoObject.residentState === ''
      ) {
        this.$emit('errorMessageHandler', 'State')
        return
      }
      if (
        this.kinInfoObject.residentLga === undefined ||
        this.kinInfoObject.residentLga === ''
      ) {
        this.$emit('errorMessageHandler', 'LGA')
        return
      }
      this.$emit('kinsContactDetailsHandler', this.kinInfoObject)
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

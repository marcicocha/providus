<template>
  <div>
    <div>
      <div>
        <AppInput
          v-model="contactDetails.email"
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
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="contactDetails.altPhoneNumber"
            label="Alt. Phone Number"
            placeholder="Enter Number"
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
          />
        </div>
      </div>
      <div class="columns">
        <div class="column small-right-padding">
          <AppInput
            v-model="contactDetails.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="contactDetails.residentCity"
            label="City/Town"
            placeholder="Enter City or Town"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppSelect
            v-model="contactDetails.residentState"
            :remote="false"
            label="State"
            placeholder="Select Option"
            :data="['Lagos']"
          />
        </div>
        <div class="column small-left-padding">
          <AppSelect
            v-model="contactDetails.residentLga"
            :remote="false"
            label="LGA"
            placeholder="Select Option"
            :data="['Lagos Island']"
          />
        </div>
      </div>
    </div>

    <AppButton title="Continue" @click="contactDetailsHandler" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppContactDetails',
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
    async contactDetailsHandler() {
      if (!this.contactDetails) {
        return
      }
      try {
        await this.$axios.$put(
          '/individual/contactDetails',
          this.contactDetails
        )
        await this.submitContactHandler(this.contactDetails)
        this.$router.replace('/user/individual/kin-information')
      } catch (err) {}
    },
    ...mapActions({
      submitContactHandler: 'individualModule/POST_CONTACT_INFORMATION',
    }),
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

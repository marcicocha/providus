<template>
  <div>
    <div>
      <AppInput
        v-model="contactDetails.email"
        label="Email Address"
        placeholder="Enter Next of Kin's Email Address"
      />
      <div class="columns">
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
      <div class="columns">
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
      <div class="columns">
        <div class="column">
          <AppInput
            v-model="contactDetails.streetName"
            label="Street Name"
            placeholder="Enter Street Name"
          />
        </div>
        <div class="column">
          <AppInput
            v-model="contactDetails.residentCity"
            label="City/Town"
            placeholder="Enter City or Town"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <AppSelect
            v-model="contactDetails.residentState"
            :remote="false"
            label="State"
            placeholder="Select Option"
            :data="['Lagos']"
          />
        </div>
        <div class="column">
          <AppSelect
            v-model="contactDetails.residentLga"
            :remote="false"
            label="LGA"
            placeholder="Select Option"
            :data="['Lagos Island']"
          />
        </div>
      </div>
      <div>
        <AppSelect
          v-model="contactDetails.residentCountry"
          :remote="false"
          label="Country"
          placeholder="Select the country of residence of yoour next of Kin"
          :data="['Nigeria']"
        />
      </div>
    </div>

    <br />
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
      console.log('CONTACT')
    },
  },
}
</script>

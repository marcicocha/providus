<template>
  <div>
    <div>
      <div>
        <AppSelect
          v-model="personalInfoObject.nationality"
          :remote="false"
          label="Nationality"
          placeholder="Select Nationality"
          :data="['LOCAL', 'FOREIGN']"
        />
      </div>

      <div v-if="personalInfoObject.nationality === 'LOCAL'">
        <div class="columns is-mobile">
          <div class="column small-right-padding">
            <AppSelect
              v-model="personalInfoObject.state"
              :remote="false"
              label="State of Origin"
              placeholder="Select Option"
              :data="['Lagos', 'Akure']"
            />
          </div>
          <div class="column small-left-padding">
            <AppSelect
              v-model="personalInfoObject.lga"
              :remote="false"
              label="LGA"
              placeholder="Select Option"
              :data="['Lagos Island', 'Ikeja', 'Lekki']"
            />
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">
            <AppSelect
              v-model="personalInfoObject.religion"
              :remote="false"
              label="Religion"
              placeholder="Select Option"
              :data="['Christian', 'Muslim']"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <AppInput
            v-model="personalInfoObject.residentPermitNo"
            label="Resident Permit No"
            placeholder="Type Number"
          />
        </div>
        <div class="columns is-mobile">
          <div class="column">
            <AppInput
              v-model="personalInfoObject.permitIssueDate"
              label="Permit Issue Date"
              placeholder="Select date"
              input-type="date"
            />
          </div>
          <div class="column">
            <AppInput
              v-model="personalInfoObject.permitExpiryDate"
              label="Permit Expiry Date"
              placeholder="Select date"
              input-type="date"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <AppInput
              v-model="personalInfoObject.taxPayerId"
              label="Tax Payer's ID"
              placeholder="Enter ID"
            />
          </div>
        </div>

        <div class="columns is-mobile">
          <div class="column small-right-padding">
            <div>
              <AppSelect
                v-model="personalInfoObject.dualCitizenship"
                :remote="false"
                label="Dual Citizenship?"
                placeholder="Select Option"
                :data="['True', 'False']"
              />
            </div>
          </div>
          <div class="column small-left-padding">
            <AppInput
              v-model="personalInfoObject.altCitizenship"
              label="If Yes, Specify?"
              placeholder="Select Option"
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="submitNationalityInfoHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppNationalityInformation',
  components: {
    AppInput,
    AppButton,
    AppSelect,
  },
  props: {
    personalInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submitNationalityInfoHandler() {
      this.$emit('nationalityHandler')
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

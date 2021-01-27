<template>
  <div>
    <div>
      <div>
        <AppSelectHybrid
          v-model="nationalityObject.nationality"
          :remote="false"
          label="Nationality"
          placeholder="Select Nationality"
          :data="['LOCAL', 'FOREIGN']"
          @change="changeNationalityHandler"
        />
      </div>

      <div v-if="nationalityObject.nationality === 'LOCAL'">
        <div class="columns is-mobile">
          <div class="column is-6 small-right-padding">
            <AppSelectHybrid
              v-model="nationalityObject.stateOfOrigin"
              label="State of Origin"
              placeholder="Select Option"
              url="/country/states?name=NIGERIA"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
            />
          </div>
          <div class="column is-6 small-left-padding">
            <AppSelectHybrid
              v-model="nationalityObject.lga"
              label="LGA"
              placeholder="Select Option"
              :url="`/state/lgas?name=${nationalityObject.stateOfOrigin}`"
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
      <div v-else>
        <div>
          <AppInput
            v-model="nationalityObject.residentPermitNo"
            label="Resident Permit No"
            placeholder="Type Number"
          />
        </div>
        <div class="columns is-mobile">
          <div class="column is-6">
            <AppInput
              v-model="nationalityObject.permitIssueDate"
              label="Permit Issue Date"
              placeholder="Select date"
              input-type="date"
            />
          </div>
          <div class="column is-6">
            <AppInput
              v-model="nationalityObject.permitExpiryDate"
              label="Permit Expiry Date"
              placeholder="Select date"
              input-type="date"
            />
          </div>
        </div>
        <AppInput
          v-model="nationalityObject.taxPayerId"
          label="Tax Payer's ID"
          placeholder="Enter ID"
        />

        <div class="columns is-mobile">
          <div class="column is-6 small-right-padding">
            <div>
              <AppSelectHybrid
                v-model="nationalityObject.dualCitizenship"
                :remote="false"
                label="Dual Citizenship?"
                placeholder="Select Option"
                :data="['YES', 'NO']"
              />
            </div>
          </div>
          <div class="column is-6 small-left-padding">
            <AppInput
              v-model="nationalityObject.altCitizenship"
              label="If Yes, Specify?"
              placeholder="Select Option"
            />
          </div>
        </div>
      </div>
      <AppSelectHybrid
        v-model="nationalityObject.religion"
        label="Religion"
        placeholder="Select Option"
        url="/globalData/data?name=RELIGION"
        :call-back-func="
          (resp) => ({
            text: resp,
            value: resp,
          })
        "
      />
    </div>
    <br />
    <AppButton title="Continue" @click="submitNationalityInfoHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppNationalityInformation',
  components: {
    AppInput,
    AppButton,
    AppSelectHybrid,
  },
  props: {
    nationalityObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submitNationalityInfoHandler() {
      this.$emit('nationalityHandler')
    },
    changeNationalityHandler(value) {
      this.$emit('updateNationalityDetails', value)
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

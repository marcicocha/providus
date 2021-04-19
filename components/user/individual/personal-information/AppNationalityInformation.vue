<template>
  <div>
    <div>
      <AppSelectHybrid
        v-model="nationalityObject.nationality"
        :remote="false"
        label="Nationality"
        placeholder="Select Nationality"
        :data="['LOCAL', 'FOREIGN']"
        disabled
        @change="changeNationalityHandler"
      />

      <template v-if="nationalityObject.nationality === 'LOCAL'">
        <div class="columns is-mobile">
          <div class="column is-6">
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
              disabled
              @change="changeStateHandler"
            />
          </div>
          <div class="column is-6">
            <AppSelectHybrid
              :key="nationalityObject.stateOfOrigin"
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
              disabled
            />
          </div>
        </div>
      </template>
      <template v-else>
        <AppInput
          v-model="nationalityObject.residentPermitNo"
          label="Resident Permit No"
          placeholder="Type Number"
        />
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
          <div class="column is-6">
            <div>
              <AppSelectHybrid
                v-model="nationalityObject.dualCitizenship"
                :remote="false"
                label="Dual Citizenship?"
                placeholder="Select Option"
                :data="['YES', 'NO']"
                @change="dualCitizenshipHandler"
              />
            </div>
          </div>
          <div class="column is-6">
            <AppInput
              v-model="nationalityObject.altCitizenship"
              label="If Yes, Specify?"
              placeholder="Enter Alt. Citizenship"
              :disabled="nationalityObject.dualCitizenship !== 'YES'"
              is-text
            />
          </div>
        </div>
      </template>
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
      if (
        this.nationalityObject.nationality === '' ||
        this.nationalityObject.nationality === undefined
      ) {
        this.$emit('errorMessageHandler', 'Nationality')
        return
      }
      if (this.nationalityObject.nationality === 'LOCAL') {
        if (
          this.nationalityObject.stateOfOrigin === '' ||
          this.nationalityObject.stateOfOrigin === undefined
        ) {
          this.$emit('errorMessageHandler', 'State of Origin')
          return
        }
        if (
          this.nationalityObject.lga === '' ||
          this.nationalityObject.lga === undefined
        ) {
          this.$emit('errorMessageHandler', 'LGA')
          return
        }
      }
      if (this.nationalityObject.nationality === 'FOREIGN') {
        if (
          this.nationalityObject.residentPermitNo === '' ||
          this.nationalityObject.residentPermitNo === undefined
        ) {
          this.$emit('errorMessageHandler', 'Resident Permit No')
          return
        }
        if (
          this.nationalityObject.permitIssueDate === '' ||
          this.nationalityObject.permitIssueDate === undefined
        ) {
          this.$emit('errorMessageHandler', 'Permit Issue Date')
          return
        }
        if (
          this.nationalityObject.permitExpiryDate === '' ||
          this.nationalityObject.permitExpiryDate === undefined
        ) {
          this.$emit('errorMessageHandler', 'Permit Expiry Date')
          return
        }
        if (
          this.nationalityObject.taxPayerId === '' ||
          this.nationalityObject.taxPayerId === undefined
        ) {
          this.$emit('errorMessageHandler', 'Tax Payer Id')
          return
        }
        if (
          this.nationalityObject.dualCitizenship === '' ||
          this.nationalityObject.dualCitizenship === undefined
        ) {
          this.$emit('errorMessageHandler', 'Dual Citizenship')
          return
        }
        if (this.nationalityObject.dualCitizenship === 'YES') {
          if (
            this.nationalityObject.altCitizenship === '' ||
            this.nationalityObject.altCitizenship === undefined
          ) {
            this.$emit('errorMessageHandler', 'Alt Citizenship')
            return
          }
        }
        const expiryDate = new Date(
          this.nationalityObject.permitExpiryDate
        ).setHours(0, 0, 0, 0)
        const issuedDate = new Date(
          this.nationalityObject.permitIssueDate
        ).setHours(0, 0, 0, 0)
        const currentDate = new Date().setHours(0, 0, 0, 0)
        if (expiryDate <= issuedDate) {
          this.$toast.open({
            message: `<p class="toast-msg">Expiry Date should be greater than Issued date</p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
        if (issuedDate >= currentDate) {
          this.$toast.open({
            message: `<p class="toast-msg">Issue Date should be less than current Date</p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
        if (expiryDate <= currentDate) {
          this.$toast.open({
            message: `<p class="toast-msg">ExpiryDate should be greater than current Date</p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
      }
      if (
        this.nationalityObject.religion === '' ||
        this.nationalityObject.religion === undefined
      ) {
        this.$emit('errorMessageHandler', 'religion')
        return
      }
      this.$emit('nationalityHandler')
    },
    changeNationalityHandler(value) {
      this.$emit('updateNationalityDetails', value)
    },
    dualCitizenshipHandler(value) {
      this.$emit('dualCitizenshipHandler', value)
    },
    changeStateHandler(value) {
      this.$emit('changeStateHandler', value)
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

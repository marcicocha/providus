<template>
  <div>
    <div>
      <AppInput
        v-model="companyDetails.nameOfCompany"
        label="Name of Company"
        placeholder="Type Name of Company"
        is-text
      />
      <AppSelect
        v-model="companyDetails.categoryOfBusiness"
        :remote="false"
        label="Category of Business"
        placeholder="Select the category business fails under"
        :data="['Lagos']"
      />
      <AppInput
        v-model="companyDetails.nameOfCompany"
        label="Registered Business Address"
        placeholder="Type your registered Business Address"
      />
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="companyDetails.registrationNumber"
            label="Registration Number"
            placeholder="Type RC No."
          />
        </div>
        <div class="column">
          <AppInput
            v-model="companyDetails.taxIdNo"
            label="Tax Identification Number"
            placeholder="Type TIN"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <AppInput
            v-model="companyDetails.phoneNumber"
            label="Company Phone Number"
            placeholder="Type Phone No"
            is-phone
          />
        </div>
        <div class="column">
          <AppInput
            v-model="companyDetails.taxIdNo"
            label="Company Email Address"
            placeholder="Type Company Email"
          />
        </div>
      </div>
    </div>
    <AppButton title="Continue" @click="submitCompanyDetails" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppCompanyForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
  },
  data() {
    return {
      companyDetails: {},
    }
  },
  methods: {
    submitCompanyDetails() {
      this.$router.replace('/user/corporate/director-details')
    },
  },
}
</script>
<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}
</style>

<template>
  <div>
    <AppInput
      v-model="personalInfoObject.taxPayerId"
      label="Tax Identification Number"
      placeholder="Enter ID Number"
      max-length="15"
    />
    <AppInput
      v-model="personalInfoObject.employeeIdNo"
      label="Employee Identification Number"
      placeholder="Enter Number"
      max-length="15"
    />
    <AppTextArea
      v-model="personalInfoObject.purposeOfAcc"
      label="Purpose of Account"
      placeholder="Type purpose of account here"
    />
    <AppButton
      title="Save &amp; Continue"
      @click="submitIdentificationInfoHandler"
    />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
import AppTextArea from '@/components/UI/AppTextArea'
export default {
  name: 'AppIdentificationNumberInformation',
  components: {
    AppInput,
    AppButton,
    AppTextArea,
  },
  props: {
    personalInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submitIdentificationInfoHandler() {
      // Relaxed Validation for Tax Identification Number

      // if (
      //   this.personalInfoObject.taxPayerId === '' ||
      //   this.personalInfoObject.taxPayerId === undefined
      // ) {
      //   this.$emit('errorMessageHandler', 'Tax Payer Id')
      //   return
      // }
      // if (
      //   this.personalInfoObject.employeeIdNo === '' ||
      //   this.personalInfoObject.employeeIdNo === undefined
      // ) {
      //   this.$emit('errorMessageHandler', 'Employee Id No')
      //   return
      // }

      this.$emit('identificationHandler')
    },
  },
}
</script>

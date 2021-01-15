<template>
  <div>
    <AppInput
      v-model="personalInfoObject.taxPayerId"
      label="Tax Identification Number"
      placeholder="Enter ID Number"
    />
    <AppInput
      v-model="personalInfoObject.employeeIdNo"
      label="Employee Identification Number"
      placeholder="Enter Number"
    />
    <AppTextArea
      v-model="personalInfoObject.accountPurpose"
      label="Purpose of Account"
      placeholder="Type purpose of account here"
    />
    <AppButton title="Continue" @click="submitIdentificationInfoHandler" />
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
      this.$emit('identificationHandler')
    },
  },
}
</script>

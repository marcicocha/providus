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
    <AppButton title="Continue" @click="submitIdentificationInfoHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppIdentificationNumberInformation',
  components: {
    AppInput,
    AppButton,
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

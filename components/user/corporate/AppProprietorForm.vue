<template>
  <div>
    <div class="columns" style="margin-bottom: 0">
      <div class="column">
        <AppInput
          v-model="proprietorDetailsObject.firstName"
          label="First Name"
          placeholder="Type First Name"
        />
      </div>
      <div class="column">
        <AppInput
          v-model="proprietorDetailsObject.surname"
          label="Surname"
          placeholder="Type Surname"
        />
      </div>
    </div>
    <AppInput
      v-model="proprietorDetailsObject.email"
      label="Email Address"
      placeholder="Enter Proprietor's email address"
    />
    <AppInput
      v-model="proprietorDetailsObject.bvn"
      label="BVN"
      placeholder="Enter Proprietor's Bank Verification Number"
    />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
export default {
  name: 'AppProprietorForm',
  components: {
    AppInput,
  },
  data() {
    return {
      proprietorDetailsObject: {},
    }
  },
}
</script>

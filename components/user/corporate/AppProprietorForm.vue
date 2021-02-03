<template>
  <div>
    <div class="columns is-mobile" style="margin-bottom: 0">
      <div class="column">
        <AppInput
          v-model="proprietorDetailsObject.firstName"
          label="First Name"
          placeholder="Type First Name"
          is-text
        />
      </div>
      <div class="column">
        <AppInput
          v-model="proprietorDetailsObject.surname"
          label="Surname"
          placeholder="Type Surname"
          is-text
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
      placeholder="Enter Proprietor's Bank Verification Number"
      label="BVN"
      is-number
      max-length="11"
      min-length="11"
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

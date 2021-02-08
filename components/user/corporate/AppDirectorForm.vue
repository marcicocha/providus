<template>
  <div>
    <div class="columns is-mobile" style="margin-bottom: 0">
      <div class="column">
        <AppInput
          v-model="directorDetailsObject.firstName"
          label="First Name"
          placeholder="Type First Name"
          is-text
        />
      </div>
      <div class="column">
        <AppInput
          v-model="directorDetailsObject.surname"
          label="Surname"
          placeholder="Type Surname"
          is-text
        />
      </div>
    </div>
    <AppInput
      v-model="directorDetailsObject.email"
      label="Email Address"
      placeholder="Enter Director's email address"
    />
    <AppInput
      v-model="directorDetailsObject.bvn"
      placeholder="Enter Director's Bank Verification Number"
      label="BVN"
      is-number
      max-length="11"
      min-length="11"
    />
    <div>
      <p><a @click="addDirectorFormHandler">+ Add Director</a></p>
    </div>
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
export default {
  name: 'AppDirectorForm',
  components: {
    AppInput,
  },
  data() {
    return {
      directorDetailsObject: {},
    }
  },
  methods: {
    addDirectorFormHandler() {
      this.$emit('addDirectorFormHandler', this.directorDetailsObject)
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  p {
    a {
      font-size: 13px !important;
    }
  }
}
</style>

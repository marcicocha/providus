<template>
  <div>
    <div>
      <div class="columns is-gapless is-mobile">
        <div class="column is-4">
          <AppSelect
            v-model="personalInfoObject.title"
            :remote="false"
            label="Title"
            placeholder="Select"
            :data="['Miss', 'Mrs', 'Mister']"
          />
        </div>
        <div class="surname column is-8">
          <AppInput
            v-model="personalInfoObject.surname"
            label="Surname"
            placeholder="Type Surname"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppInput
            v-model="personalInfoObject.firstName"
            label="First Name"
            placeholder="First Name"
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="personalInfoObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppSelect
            v-model="personalInfoObject.maritalStatus"
            :remote="false"
            label="Marital Status"
            placeholder="Select Option"
            :data="['Single', 'Divorced', 'Married', 'Widowed']"
          />
        </div>
        <div class="column small-left-padding">
          <AppSelect
            v-model="personalInfoObject.gender"
            :remote="false"
            label="Gender"
            placeholder="Select Option"
            :data="['Male', 'Female']"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppInput
            v-model="personalInfoObject.maidenName"
            label="Mother's Maiden Name"
            placeholder="Type Name"
          />
        </div>
        <div class="column small-left-padding">
          <AppInput
            v-model="personalInfoObject.dob"
            label="Date of Birth"
            placeholder="Select Date"
            type="date"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column small-right-padding">
          <AppInput
            v-model="personalInfoObject.occupation"
            label="Occupation"
            placeholder="Type Occupation"
          />
        </div>
        <div class="column small-left-padding">
          <AppSelect
            v-model="personalInfoObject.currency"
            :remote="false"
            label="Currency Type"
            placeholder="Select Currency"
            :data="['NGN', 'USD']"
          />
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="submitBasicInformationHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppBasicInformation',
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
  data() {
    return {}
  },
  methods: {
    submitBasicInformationHandler() {
      this.$emit('basicInfoHandler')
    },
  },
}
</script>

<style scoped>
.surname {
  /* width: 66.9%;
  padding-left: 0 !important;
  border-left-color: transparent !important; */
  margin-left: -1px !important;
}
.firstname {
  padding-right: 0 !important;
}
.small-left-padding {
  padding-left: 5px !important;
}
.small-right-padding {
  padding-right: 5px !important;
}
</style>

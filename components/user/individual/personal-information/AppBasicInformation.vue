<template>
  <div>
    <div>
      <div class="columns is-gapless is-mobile">
        <div class="column is-4">
          <AppSelect
            v-model="personalInfoObject.title"
            label="Title"
            placeholder="Select"
            :data="['Miss', 'Mrs', 'Mister']"
            url="/globalData/data?name=TITLE"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
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
        <div class="column is-6 small-right-padding">
          <AppInput
            v-model="personalInfoObject.firstName"
            label="First Name"
            placeholder="First Name"
          />
        </div>
        <div class="column is-6 small-left-padding">
          <AppInput
            v-model="personalInfoObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-6 small-right-padding">
          <AppSelectHybrid
            v-model="personalInfoObject.maritalStatus"
            label="Marital Status"
            placeholder="Select Option"
            url="/globalData/data?name=MARITAL_STATUS"
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
            v-model="personalInfoObject.gender"
            label="Gender"
            placeholder="Select Option"
            url="/globalData/data?name=GENDER"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-6 small-right-padding">
          <AppInput
            v-model="personalInfoObject.maidenName"
            label="Mother's Maiden Name"
            placeholder="Type Name"
          />
        </div>
        <div class="column is-6 small-left-padding">
          <AppInput
            v-model="personalInfoObject.dateOfBirth"
            label="Date of Birth"
            placeholder="Select Date"
            input-type="date"
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-6 small-right-padding">
          <AppInput
            v-model="personalInfoObject.occupation"
            label="Occupation"
            placeholder="Type Occupation"
          />
        </div>
        <div class="column is-6 small-left-padding">
          <AppSelectHybrid
            v-model="personalInfoObject.currency"
            label="Currency Type"
            placeholder="Select Currency"
            url="/globalData/data?name=CURRENCY"
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
    <br />
    <AppButton title="Continue" @click="submitBasicInformationHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppBasicInformation',
  components: {
    AppInput,
    AppButton,
    AppSelect,
    AppSelectHybrid,
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

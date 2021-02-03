<template>
  <div>
    <div class="wrap">
      <div class="columns is-gapless is-mobile">
        <div class="column is-4">
          <AppSelectHybrid
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
            is-text
          />
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-6 small-right-padding">
          <AppInput
            v-model="personalInfoObject.firstName"
            label="First Name"
            placeholder="First Name"
            is-text
          />
        </div>
        <div class="column is-6 small-left-padding">
          <AppInput
            v-model="personalInfoObject.middleName"
            label="Middle Name"
            placeholder="Middle Name"
            is-text
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
            is-text
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
            is-text
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
            disabled
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
// import AppSelect from '@/components/UI/AppSelect'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppBasicInformation',
  components: {
    AppInput,
    AppButton,
    // AppSelect,
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
      if (
        this.personalInfoObject.title === '' ||
        this.personalInfoObject.title === undefined
      ) {
        this.$emit('errorMessageHandler', 'Title')
        return
      }
      if (
        this.personalInfoObject.surname === '' ||
        this.personalInfoObject.surname === undefined
      ) {
        this.$emit('errorMessageHandler', 'Surname')
        return
      }
      if (
        this.personalInfoObject.firstName === '' ||
        this.personalInfoObject.firstName === undefined
      ) {
        this.$emit('errorMessageHandler', 'First Name')
        return
      }
      if (
        this.personalInfoObject.middleName === '' ||
        this.personalInfoObject.middleName === undefined
      ) {
        this.$emit('errorMessageHandler', 'Middle Name')
        return
      }
      if (
        this.personalInfoObject.maritalStatus === '' ||
        this.personalInfoObject.maritalStatus === undefined
      ) {
        this.$emit('errorMessageHandler', 'Marital Status')
        return
      }
      if (
        this.personalInfoObject.gender === '' ||
        this.personalInfoObject.gender === undefined
      ) {
        this.$emit('errorMessageHandler', 'Gender')
        return
      }
      if (
        this.personalInfoObject.maidenName === '' ||
        this.personalInfoObject.maidenName === undefined
      ) {
        this.$emit('errorMessageHandler', 'Maiden Name')
        return
      }
      if (
        this.personalInfoObject.dateOfBirth === '' ||
        this.personalInfoObject.dateOfBirth === undefined
      ) {
        this.$emit('errorMessageHandler', 'Date of Birth')
        return
      }
      if (
        this.personalInfoObject.occupation === '' ||
        this.personalInfoObject.occupation === undefined
      ) {
        this.$emit('errorMessageHandler', 'Occupation')
        return
      }
      if (
        this.personalInfoObject.currency === '' ||
        this.personalInfoObject.currency === undefined
      ) {
        this.$emit('errorMessageHandler', 'Currency')
        return
      }
      const year = this.personalInfoObject.dateOfBirth.substring(0, 4)
      const newDate = new Date()
      const currentYear = newDate.getFullYear()
      if (currentYear - year < 18) {
        this.$emit('errorMessageHandler', 'Year')
        return
      }
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

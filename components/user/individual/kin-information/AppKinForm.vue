<template>
  <div>
    <div>
      <div>
        <div class="columns is-gapless is-mobile">
          <div class="column is-4">
            <AppSelectHybrid
              v-model="kinInfoObject.title"
              label="Title"
              placeholder="Select"
              url="/globalData/data?name=TITLE"
              :call-back-func="
                (resp) => ({
                  text: resp,
                  value: resp,
                })
              "
            />
          </div>
          <div class="column surname is-8">
            <AppInput
              v-model="kinInfoObject.surname"
              label="Surname"
              placeholder="Type Surname"
              is-text
            />
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-6">
            <AppInput
              v-model="kinInfoObject.firstName"
              label="First Name"
              placeholder="First Name"
              is-text
            />
          </div>
          <div class="column is-6">
            <AppInput
              v-model="kinInfoObject.middleName"
              label="Middle Name"
              placeholder="Middle Name"
              is-text
            />
          </div>
        </div>
        <div>
          <AppSelectHybrid
            v-model="kinInfoObject.relationship"
            label="Relationship"
            placeholder="Select your relationship with this person"
            url="/globalData/data?name=RELATIONSHIP"
            :call-back-func="
              (resp) => ({
                text: resp,
                value: resp,
              })
            "
          />
        </div>
        <div class="columns is-mobile">
          <div class="column small-right-padding">
            <AppSelectHybrid
              v-model="kinInfoObject.maritalStatus"
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
          <div class="column small-left-padding">
            <AppSelectHybrid
              v-model="kinInfoObject.gender"
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
          <div class="column small-right-padding">
            <AppInput
              v-model="kinInfoObject.dateOfBirth"
              label="Date of Birth"
              placeholder="Select Date"
              input-type="date"
            />
          </div>
          <div class="column small-left-padding">
            <AppInput
              v-model="kinInfoObject.bvn"
              label="BVN"
              placeholder="Enter BVN"
              is-number
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="kinDetailsHandler" />
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppKinForm',
  components: {
    AppSelectHybrid,
    AppInput,
    AppButton,
  },
  props: {
    kinInfoObject: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    kinDetailsHandler() {
      if (
        this.kinInfoObject.title === undefined ||
        this.kinInfoObject.title === ''
      ) {
        this.$emit('errorMessageHandler', 'Title')
        return
      }
      if (
        this.kinInfoObject.surname === undefined ||
        this.kinInfoObject.surname === ''
      ) {
        this.$emit('errorMessageHandler', 'Surname')
        return
      }
      if (
        this.kinInfoObject.firstName === undefined ||
        this.kinInfoObject.firstName === ''
      ) {
        this.$emit('errorMessageHandler', 'First Name')
        return
      }
      if (
        this.kinInfoObject.middleName === undefined ||
        this.kinInfoObject.middleName === ''
      ) {
        this.$emit('errorMessageHandler', 'Middle Name')
        return
      }
      if (
        this.kinInfoObject.relationship === undefined ||
        this.kinInfoObject.relationship === ''
      ) {
        this.$emit('errorMessageHandler', 'Relationship')
        return
      }
      if (
        this.kinInfoObject.maritalStatus === undefined ||
        this.kinInfoObject.maritalStatus === ''
      ) {
        this.$emit('errorMessageHandler', 'MaritalStatus')
        return
      }
      if (
        this.kinInfoObject.gender === undefined ||
        this.kinInfoObject.gender === ''
      ) {
        this.$emit('errorMessageHandler', 'Gender')
        return
      }
      if (
        this.kinInfoObject.dateOfBirth === undefined ||
        this.kinInfoObject.dateOfBirth === ''
      ) {
        this.$emit('errorMessageHandler', 'Date of Birth')
        return
      }
      // const year = this.kinInfoObject.dateOfBirth.getYear()
      this.$emit('kinDetailsHandler')
    },
  },
}
</script>
<style scoped>
.small-left-padding {
  padding-left: 5px !important;
}
.small-right-padding {
  padding-right: 5px !important;
}
.surname {
  margin-left: -1px !important;
}
</style>

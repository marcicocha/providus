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
            />
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column small-right-padding">
            <AppInput
              v-model="kinInfoObject.firstName"
              label="First Name"
              placeholder="First Name"
            />
          </div>
          <div class="column small-left-padding">
            <AppInput
              v-model="kinInfoObject.middleName"
              label="Middle Name"
              placeholder="Middle Name"
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

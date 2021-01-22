<template>
  <div>
    <div>
      <div>
        <div class="columns is-gapless is-mobile">
          <div class="column is-4">
            <AppSelect
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
          <AppSelect
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
            <AppSelect
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
            <AppSelect
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
              v-model="kinInfoObject.dob"
              label="Date of Birth"
              placeholder="Select Date"
              type="date"
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
import { mapActions } from 'vuex'
import AppInput from '@/components/UI/AppInput'
import AppSelect from '@/components/UI/AppSelect'
import AppButton from '@/components/UI/AppButton'
export default {
  name: 'AppKinForm',
  components: {
    AppSelect,
    AppInput,
    AppButton,
  },
  data() {
    return {
      kinInfoObject: {},
    }
  },
  methods: {
    async kinDetailsHandler() {
      if (!this.kinInfoObject) {
        return
      }
      try {
        await this.$axios.$put('/individual/personalInfo', this.kinInfoObject)
        await this.submitKinInfoHandler(this.kinInfoObject)
        this.$router.replace('/user/individual/kin-contact-information')
      } catch (err) {}
    },
    ...mapActions({
      submitKinInfoHandler: 'individualModule/POST_KINS_INFORMATION',
    }),
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

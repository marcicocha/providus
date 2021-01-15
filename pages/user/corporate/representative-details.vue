<template>
  <div>
    <AppTitleComponent
      heading="Open a Corporate Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><hr /></div>
      <div>
        <h2>Representative Details</h2>
        <div>
          <div class="columns">
            <div class="column">
              <AppInput
                v-model="representativeDetails.firstName"
                label="First Name"
                placeholder="Enter First Name"
              />
            </div>
            <div class="column">
              <AppInput
                v-model="representativeDetails.surname"
                label="Surname"
                placeholder="Enter Surname"
              />
            </div>
          </div>
          <div>
            <AppInput
              v-model="representativeDetails.emailAddress"
              label="Email Address"
              placeholder="Enter your Email Address"
            />
          </div>
          <div class="columns">
            <div class="column">
              <AppInput
                v-model="representativeDetails.phoneNumber"
                label="Phone Number"
                placeholder="Enter Number"
              />
            </div>
            <div class="column">
              <AppInput
                v-model="representativeDetails.altPhoneNumber"
                label="Alternate Phone Number"
                placeholder="Enter Number"
              />
            </div>
          </div>
        </div>
        <AppButton title="Continue" @click="representativeSubmitHandler" />
      </div>
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppInput,
    AppButton,
  },
  data() {
    return {
      representativeDetails: {},
    }
  },
  methods: {
    representativeSubmitHandler() {
      console.log(this.representativeDetails, 'REPRESENTATIVE OBJECT!!')
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  font-family: 'GothamMedium', sans-serif;
  color: #fdb813;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  margin-bottom: 30px;
}
.account-info__block {
  width: 80%;
  padding-top: 30px;
}
hr {
  margin: 2rem 0 !important;
}
</style>

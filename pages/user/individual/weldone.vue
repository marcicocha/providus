<template>
  <div class="child-container">
    <div style="margin-top: -15px; width: 70%">
      <div v-if="typeof accountNo === 'number'">
        <img src="@/assets/images/fire-cracker.svg" />
      </div>

      <h1 v-if="typeof accountNo === 'number'">Congratulations</h1>
      <h1 v-else>Session Completed</h1>

      <p v-if="typeof accountNo === 'number'">
        Please Check your Email and SMS for your new Account Details and Next
        Steps
      </p>
      <p v-else>
        {{ accountNo }}
      </p>

      <div v-if="typeof accountNo === 'number'">
        <hr />
        <div>
          <span> Account Number</span>
          <p>{{ accountNo }}</p>
        </div>
      </div>
      <AppButton title="Go back to Website" @click="saveHandler" />
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'
import { mapState } from 'vuex'
export default {
  components: {
    AppButton,
  },
  data() {
    return {
      name: 'David',
    }
  },
  computed: {
    ...mapState({
      accountNo: (state) => state.individualModule.accountNumber,
    }),
  },
  methods: {
    saveHandler() {
      window.location = '/'
    },
  },
}
</script>
<style lang="scss" scoped>
.child-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin-bottom: 15px;
  color: #2e434e;
  margin-top: 30px;
}
p {
  font-family: 'GothamThin', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #2e434e;
  letter-spacing: 1px;
  margin-bottom: 30px;
}
</style>

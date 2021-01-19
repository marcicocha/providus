<template>
  <div>
    <AppTitleComponent heading="Welcome Back" />
    <br />
    <div>
      <hr />
      <p>Here are the tasks left for you to complete</p>
      <br />
      <div>
        <div class="columns is-mobile">
          <div class="column">
            <AppUpload label="Mandate Form" />
          </div>
          <div class="column">
            <AppUpload label="Board Resolution" />
          </div>
        </div>
        <div class="mb-10">
          <AppUpload label="Company Registration Documents" />
        </div>
        <div class="columns is-mobile">
          <div class="column">
            <AppUpload label="ID" />
          </div>
          <div class="column">
            <AppUpload label="Utility Bill" />
          </div>
        </div>
        <div>
          <AppInput
            v-model="documentObject.taxIdNo"
            label="Tax Identification Number (TIN)"
            placeholder="Enter ID Number"
          />
        </div>
      </div>
    </div>
    <br />
    <AppButton title="Continue" @click="nextPageHandler" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppUpload from '@/components/UI/AppUpload'
import AppButton from '@/components/UI/AppButton'
import AppInput from '@/components/UI/AppInput'
export default {
  components: {
    AppTitleComponent,
    AppUpload,
    AppButton,
    AppInput,
  },
  data() {
    return {
      documentObject: {},
    }
  },
  methods: {
    nextPageHandler() {
      this.$router.replace('/user/corporate/weldone')
    },
  },
}
</script>
<style lang="scss" scoped>
.columns {
  margin-bottom: 0 !important;
}
.mb-10 {
  margin-bottom: 10px;
}
</style>

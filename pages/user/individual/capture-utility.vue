<template>
  <div>
    <a class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent
      heading="Capture Utility Bill"
      description="Please capture a valid utility bill not later than 3 months."
    />
    <AppCaptureUtility :key="counter" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureUtility from '@/components/user/individual/capture/AppCaptureUtility'

export default {
  components: {
    AppTitleComponent,
    AppCaptureUtility,
  },
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    backButtonHandler() {
      this.counter++
      this.$router.replace('/user/individual/upload-utility')
    },
  },
}
</script>
<style lang="scss" scoped>
.back-button {
  span {
    margin-left: 5px;
  }
}

@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    .back-button {
      font-size: 13px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    .back-button {
      font-size: 1em;
    }
  }
}
</style>

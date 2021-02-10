<template>
  <div>
    <!-- <a class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    > -->
    <AppTitleComponent heading="Contact Details" />
    <AppContactForm />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppContactForm from '@/components/user/individual/contact-information/AppContactForm.vue'
export default {
  components: {
    AppTitleComponent,
    AppContactForm,
  },
  methods: {
    // backButtonHandler() {
    //   this.$router.replace('/user/individual/personal-information')
    // },
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

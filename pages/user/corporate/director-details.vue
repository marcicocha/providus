<template>
  <div>
    <AppTitleComponent heading="Director Details" />
    <br />
    <div>
      <AppAccordion heading="Director">
        <template slot="content">
          <AppDirectorForm />
        </template>
      </AppAccordion>
      <p><a @click="addDirectorFormHandler">+ Add Director</a></p>
    </div>
    <br />
    <AppButton title="Continue" @click="submitDirectorHandler" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppAccordion from '@/components/UI/AppAccordion.vue'
import AppDirectorForm from '@/components/user/corporate/AppDirectorForm.vue'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppAccordion,
    AppDirectorForm,
    AppButton,
  },
  methods: {
    submitDirectorHandler() {
      this.$router.replace('/user/corporate/proprietor-details')
    },
    addDirectorFormHandler() {},
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  p {
    a {
      font-size: 13px !important;
    }
  }
}
</style>

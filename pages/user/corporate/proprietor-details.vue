<template>
  <div>
    <AppTitleComponent heading="Proprietor Details" />
    <br />
    <div>
      <AppAccordion heading="Proprietor">
        <template slot="content">
          <AppProprietorForm />
        </template>
      </AppAccordion>
      <p><a @click="addProprietorFormHandler">+ Add Proprietor</a></p>
    </div>
    <br />
    <AppButton title="Continue" @click="submitProprietorHandler" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppAccordion from '@/components/UI/AppAccordion.vue'
import AppProprietorForm from '@/components/user/corporate/AppProprietorForm.vue'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppAccordion,
    AppProprietorForm,
    AppButton,
  },
  methods: {
    submitProprietorHandler() {
      this.$router.replace('/user/corporate/next-step')
    },
    addProprietorFormHandler() {
      console.log('THIS:::')
    },
  },
}
</script>

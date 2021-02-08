<template>
  <div>
    <AppTitleComponent heading="Proprietor Details" />
    <br />
    <div>
      <AppAccordion
        v-for="n in noOfProprietor"
        :heading="`Proprietor ${n}`"
        :key="n"
        :initIsTrue="n === noOfProprietor ? true : false"
      >
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
  data() {
    return {
      noOfProprietor: 1,
      proprietorList: [],
    }
  },
  methods: {
    submitProprietorHandler() {
      this.$router.replace('/user/corporate/next-step')
    },
    addProprietorFormHandler() {
      if (this.noOfProprietor < 5) {
        this.noOfProprietor++
      } else {
        this.$toast.open({
          message: `<p class="toast-msg"> Only 5 Proprietors can be added</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
      }
    },
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

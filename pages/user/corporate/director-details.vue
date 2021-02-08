<template>
  <div>
    <AppTitleComponent heading="Director Details" />
    <div>
      <AppAccordion
        v-for="n in noOfDirector"
        :key="n"
        :heading="`Director ${n}`"
        :init-is-true="n === noOfDirector ? true : false"
      >
        <template slot="content">
          <AppDirectorForm />
        </template>
      </AppAccordion>
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
  data() {
    return {
      noOfDirector: 1,
      directorList: [],
    }
  },
  methods: {
    submitDirectorHandler() {
      this.$router.replace('/user/corporate/proprietor-details')
    },
    addDirectorFormHandler(obj) {
      this.directorList.push(obj)
      if (this.noOfDirector < 5) {
        this.noOfDirector++
      } else {
        this.$toast.open({
          message: `<p class="toast-msg"> Only 5 Directors can be added</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
      }
    },
  },
}
</script>

<template>
  <div>
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
}
</script>

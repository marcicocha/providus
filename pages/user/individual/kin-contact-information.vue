<template>
  <div>
    <AppTitleComponent heading="Next of Kin Contact information" />

    <AppKinContactForm />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinContactForm from '@/components/user/individual/kin-information/AppKinContactForm'
export default {
  components: {
    AppTitleComponent,
    AppKinContactForm,
  },
}
</script>

<template>
  <div>
    <AppTitleComponent heading="Contact Details" />
    <AppContactDetails />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppContactDetails from '@/components/user/individual/contact-information/AppContactDetails.vue'
export default {
  components: {
    AppTitleComponent,
    AppContactDetails,
  },
}
</script>

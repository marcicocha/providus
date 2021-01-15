<template>
  <div>
    <AppTitleComponent heading="Next of Kin Contact information" />

    <AppKinContactDetails />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinContactDetails from '@/components/user/individual/kin-information/AppKinContactDetails.vue'
export default {
  components: {
    AppTitleComponent,
    AppKinContactDetails,
  },
}
</script>

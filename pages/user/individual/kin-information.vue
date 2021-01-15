<template>
  <div>
    <AppTitleComponent heading="Next of Kin information" />

    <AppKinDetails />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppKinDetails from '@/components/user/individual/kin-information/AppKinDetails'
export default {
  components: {
    AppTitleComponent,
    AppKinDetails,
  },
}
</script>

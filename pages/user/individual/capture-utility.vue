<template>
  <div>
    <AppTitleComponent
      heading="Capture Utility Bill"
      description="Please capture a valid utility bill not later than 3 months."
    />
    <AppCaptureUtility />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureUtility from '@/components/user/individual/capture/AppCaptureUtility'

export default {
  components: {
    AppTitleComponent,
    AppCaptureUtility,
  },
}
</script>

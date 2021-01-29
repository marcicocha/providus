<template>
  <div>
    <AppTitleComponent
      heading="Capture ID"
      description="Place ID within the edges of the rectangle."
    />

    <AppCaptureId />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureId from '@/components/user/individual/capture/AppCaptureId'
export default {
  components: {
    AppTitleComponent,
    AppCaptureId,
  },
}
</script>

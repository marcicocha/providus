<template>
  <div>
    <div>
      <canvas id="capture" width="320" height="240"></canvas>
    </div>
    <AppButton title="Capture Selfie" />
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureSelfie',
  components: {
    AppButton,
  },
}
</script>

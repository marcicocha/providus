<template>
  <div>
    <div>
      <canvas id="capture" width="320" height="240"></canvas>
    </div>
    <AppButton title="Capture Selfie" @click="submitCaptureHandler" />
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureSelfie',
  components: {
    AppButton,
  },
  methods: {
    submitCaptureHandler() {
      this.$emit('submitCapturehandler')
    },
  },
}
</script>

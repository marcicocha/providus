<template>
  <div class="parent_container">
    <AppTitleComponent heading="Capture Selfie" :description="description" />
    <br />
    <AppCaptureInstruction
      v-if="isCaptureInstruction"
      @captureInstructionHandler="captureInstructionHandler"
    />
    <AppCaptureSelfie v-if="isCapture" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCaptureInstruction from '@/components/user/individual/capture-selfie/AppCaptureInstruction'
import AppCaptureSelfie from '@/components/user/individual/capture-selfie/AppCaptureSelfie.vue'
export default {
  components: {
    AppTitleComponent,
    AppCaptureInstruction,
    AppCaptureSelfie,
  },
  data() {
    return {
      description: 'Take a selfie showing your face.',
      isCaptureInstruction: true,
      isCapture: false,
    }
  },
  methods: {
    captureInstructionHandler() {
      this.isCaptureInstruction = false
      this.isCapture = true
      this.description =
        'Stay still and keep your face inside the oval while taking selfie'
    },
  },
}
</script>
<style lang="scss" scoped>
.parent_container {
  width: 85%;
  height: 100%;
}
@media only screen and (max-width: 991px) {
  .parent_container {
    width: 100% !important;
    height: 100%;
  }
}
</style>

<template>
  <div>
    <div>
      <camera :requestAccess="true" @camera:captured="getImage">
        <div slot="capture" name="capture">snap</div>
      </camera>
    </div>
    <AppButton title="Capture Selfie" @click="submitCaptureHandler" />
  </div>
</template>
<script>
import { Camera } from 'vue-capture'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureSelfie',
  components: {
    AppButton,
    Camera,
  },
  methods: {
    submitCaptureHandler() {
      this.$emit('submitCapturehandler')
    },
    getImage(data) {
      console.log(data, 'IMAGE DATA')
    },
  },
}
</script>

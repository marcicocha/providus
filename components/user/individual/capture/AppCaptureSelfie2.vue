<template>
  <div v-if="!loading">
    <div class="container">
      <video id="" autoplay playsinline style="width: 100%"></video>
      <canvas id="face-detected-cv" class="canvas"></canvas>
    </div>
    <div id="controls">
      <p id="video-settings" style="width: 100%; overflow: hidden"></p>
      <p id="feedback" style="width: 100%; overflow: hidden"></p>

      <div class="btn-control">
        <button id="start-camera" class="mbtn startcam" onclick="startCamera()">
          Start Camera
        </button>
        <!-- <button id="start-capture" class="mbtn" onclick="capture()">
          Start Capture
        </button> -->
        <!-- <button id="find-face" class="mbtn" onclick="findFace()" disabled>
          Find face
        </button>
        <button id="stop-capture" class="mbtn" onclick="stopCapture()">
          STOP
        </button> -->
      </div>

      <!-- <div class="video-source select">
        <label class="sl" for="videoSource">Video source: </label
        ><select id="videoSource" onchange="restart()"></select>
      </div> -->
    </div>
    <!--    <div id="face-coord">-->
    <!--      <span-->
    <!--        >Face coords:-->
    <!--        <pre id="face-coords"></pre>-->
    <!--      </span>-->
    <!--    </div>-->

    <img id="image" />

    <pre id="settings"></pre>
    <AppButton
      id="start-capture-single"
      title="Capture Selfie"
      @click="submitCaptureHandler"
    />
    <!-- <AppButton title="Capture Selfie" @click="submitCaptureHandler" /> -->
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureSelfie',
  components: {
    AppButton,
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
      .then(() => {
        this.loading = false
        this.$loadScript('/daon/face/faceCapture.min.js').then(() => {
          this.$loadScript('/daon/face/auto.js').then(() => {
            setTimeout(() => {
              document.querySelector('.startcam').click()
            }, 1000)
          })
        })
      })
      .catch((err) => {
        // Failed to fetch script
        this.loading = false
        let errorMessage = 'Network Error'

        // Error Message from Backend
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage

          this.$toast.open({
            message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
        }
      })
  },
  beforeDestroy() {
    this.$unloadScript('https://webrtc.github.io/adapter/adapter-latest.js')
      .then(() => {
        this.loading = false
        this.$unloadScript('/daon/face/faceCapture.min.js').then(() => {
          this.$unloadScript('/daon/face/auto.js').then(() => {})
        })
      })
      .catch((err) => {
        // Failed to fetch script
        this.loading = false
        let errorMessage = 'Network Error'

        // Error Message from Backend
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage

          this.$toast.open({
            message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
        }
      })
  },
  methods: {
    submitCaptureHandler() {
      //  this.$emit('submitCapturehandler')
      document.querySelector('#start-capture-single').click()
    },
    getImage(data) {},
  },
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  position: relative;
}
pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 9px;
  overflow-x: auto;
  padding: 0.1rem;
  white-space: pre;
  word-wrap: normal;
}
#video-settings,
#feedback {
  width: 100%;
  display: block;
  font-size: 9px;
}
.video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}
select {
  display: inline-block;
  width: 100%;
  float: left;
}
.canvas {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  transform: scaleX(-1);
}
#controls {
  display: block;
  position: relative;
}
.mbtn {
  width: auto !important;
  display: inline-block;
  float: left;
  font-size: 9px;
}
.sl,
#face-coord {
  font-size: 11px;
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #fdb813;
  right: 1.125em;
  z-index: 4;
  margin-top: 6px;
}
.video-source,
.btn-control {
  display: inline-block;
  width: 100%;
  height: auto;
  font-size: 10px;
}
</style>

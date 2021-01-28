<template>
  <div v-if="!loading">
    <div>
      <!--      <canvas id="capture" width="320" height="240"></canvas>-->

      <!--      <canvas id="face-detected-cv" width="320"></canvas>-->
      <!--      <video-->
      <!--        id="videoElement"-->
      <!--        video-->
      <!--        autoplay="true"-->
      <!--        style="width: 100%; height: 240px"-->
      <!--      ></video>-->
      <!--      <img id="image" />-->
      <!--      <div class="controls">-->
      <!--        <button id="start-cam" class="start-cam" onclick="startCamera()">-->
      <!--          Start Camera-->
      <!--        </button>-->
      <!--        <button id="start-capture" onclick="capture()" disabled>-->
      <!--          Start Capture-->
      <!--        </button>-->
      <!--        <button id="stop-capture" class="stopcam" onclick="stopCapture()">-->
      <!--          STOP-->
      <!--        </button>-->
      <!--        <button id="capture-single" class="selfie" onclick="captureSingle()">-->
      <!--          Capture-->
      <!--        </button>-->
      <!--        <button id="find-face" onclick="findFace()" disabled>Find face</button>-->
      <!--      </div>-->
    </div>

    <div class="container">
      <video id="" autoplay playsinline style="width: 100%"></video>
      <canvas id="face-detected-cv" class="canvas"></canvas>
    </div>
    <div id="controls">
      <!--      <p id="video-settings" style="width: 100%; overflow: hidden"></p>-->
      <!--      <p id="feedback" style="width: 100%; overflow: hidden"></p>-->

      <!--      <div class="btn-control">-->
      <!--        <button id="start-camera" class="mbtn startcam" onclick="startCamera()">-->
      <!--          Start Camera-->
      <!--        </button>-->
      <!--        <button id="start-capture" class="mbtn" onclick="capture()">-->
      <!--          Start Capture-->
      <!--        </button>-->
      <!--        <button-->
      <!--          id="start-capture-single"-->
      <!--          class="mbtn"-->
      <!--          onclick="captureSingle()"-->
      <!--        >-->
      <!--          Capture-->
      <!--        </button>-->
      <!--        <button id="find-face" class="mbtn" onclick="findFace()" disabled>-->
      <!--          Find face-->
      <!--        </button>-->
      <!--        <button id="stop-capture" class="mbtn" onclick="stopCapture()">-->
      <!--          STOP-->
      <!--        </button>-->
      <!--      </div>-->
      <button
        v-show="cus_btn"
        id="start-capture-single"
        class="mbtn"
        onclick="captureSingle()"
      >
        Capture
      </button>
      <button
        v-show="cus_btn"
        id="start-camera"
        class="mbtn startcam"
        onclick="startCamera()"
      >
        Start Camera
      </button>
      <div class="video-source select">
        <label class="sl" for="videoSource">Camera source: </label
        ><select id="videoSource" onchange="restart()"></select>
      </div>
    </div>
    <div id="face-coord">
      <span>
        <div id="face-coords"></div>
      </span>
    </div>

    <img id="image" ref="imageRef" />

    <pre id="settings"></pre>
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
  data() {
    return {
      loading: true,
      cus_btn: false,
      imgHolder: '',
      source: '',
    }
  },
  computed: {
    imageWatch() {
      return this.$refs.data
    },
  },
  watch: {
    imgHolder: {
      handler(newVal, oldVal) {
        if (newVal !== '') {
          console.log(newVal, '::newVal:newVal:newVal', this.source)
          console.log(newVal, 'before string')
          console.log(newVal.src, 'to string')
          // this.getBaseImage(newVal.src)
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
      .then(() => {
        this.loading = false
        this.$loadScript('/daon/face/faceCapture.min.js').then(() => {
          this.$loadScript('/daon/face/auto.js').then(() => {
            document.querySelector('.startcam').click()
          })
        })
      })
      .catch((error) => {
        // Failed to fetch script
        this.loading = false
        console.log(error)
      })
  },
  methods: {
    getBaseImage(img) {
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        const base64data = reader.result
        console.log(base64data, '::: hi ::::')
        return base64data
      }
      // return dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
    },
    submitCaptureHandler() {
      //  this.$emit('submitCapturehandler')
      // document.querySelector('#start-capture-single').click()
      window.captureSingle()
      setTimeout(() => {
        const ref = this.$refs.imageRef
        const imgHolder = ref.currentSrc
        console.log(imgHolder, 'image holder')
      }, 1000)
    },
    getImage(data) {
      console.log(data, 'IMAGE DATA')
    },
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
.mbtn,
#controls {
  width: auto !important;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  font-size: 9px;
  visibility: hidden;
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

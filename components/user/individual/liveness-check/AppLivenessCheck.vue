<template>
  <div v-show="!loading" id="liveness-wrapper">
    <div id="clientcontainer">
      <h1 id="instructions">Please center your face so it fills the guide</h1>
      <div id="videocontainer">
        <video
          id="video_capture"
          muted
          playsinline
          autoplay
          height="300"
          width="300"
        >
          Video Loading ...
        </video>
        <canvas id="motioncanvas" class="displaycanvas"></canvas>
        <canvas id="rendercanvas" class="displaycanvas"></canvas>
        <label id="versionstr" class="info_col1">##version_number##</label>
        <label id="nbcaptures" class="info_col1">nb captures: 0</label>
        <label id="dimensions" class="info_col2">-- x --</label>
        <label id="timingTracker" class="info_col2">3dfl: -- ms</label>
        <label id="timingAnalysis" class="info_col2">3dfl: -- ms</label>
        <label id="ied" class="info_col2">ied: --</label>
        <button id="btn-settings" class="fas fa-cogs"></button>
        <p id="instructions_on_face"></p>
      </div>
      <div id="settingsdiv" class="panel container_invisible">
        <ul>
          <li>
            <input
              id="keeptplcheck"
              type="checkbox"
              name="options_keep_tpl"
              checked
            />
            <label for="keeptplcheck">keep tpl on server</label>
          </li>
          <li>
            <input
              id="showextrainfo"
              type="checkbox"
              name="options_show_info"
              checked
            />
            <label for="showextrainfo">show extra info</label>
          </li>
          <li>
            <input id="allowh264" type="checkbox" name="options_allow_h264" />
            <label for="allowh264">use H264 if available</label>
          </li>
          <li>
            <input
              id="displayfacebox"
              type="checkbox"
              name="display_face_box"
              checked
            />
            <label for="displayfacebox">show face box</label>
          </li>
          <li>
            <input id="forcejpegtpl" type="checkbox" name="force_jpeg_tpl" />
            <label for="forcejpegtpl">force JPEG templates</label>
          </li>
          <li>
            <select id="jpeglevels" size="1">
              <option value="0.4">0.4</option>
              <option value="0.5">0.5</option>
              <option value="0.6" selected>0.6</option>
              <option value="0.7">0.7</option>
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <!-- <option value="png">PNG</option> -->
            </select>
            <label for="jpeglevels">JPEG compression</label>
          </li>
        </ul>

        <button id="btn-settings-return">Back</button>
      </div>
      <label id="score3dfl"></label>
      <input
        id="liveness-result"
        v-model="livenessCapture"
        class="mbtn"
        type="text"
        @click="getLivenessResult"
      />
    </div>
    <AppButton
      v-show="!accountCreation"
      id="btn-start-session"
      title="Please Wait"
      @click.prevent="livenessCheckHandler"
    />
    <AppButton
      v-show="accountCreation"
      :loading="accountCreation"
      title="creating account..."
    />
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'
import { mapActions } from 'vuex'

export default {
  name: 'AppLivenessCheck',
  components: {
    AppButton,
  },
  data() {
    return {
      loading: true,
      livenessCapture: '',
      reqId: '',
      accountCreation: false,
    }
  },
  watch: {
    livenessCapture(update) {
      if (update) {
        this.saveLivenessCheck()
      }
    },
  },
  mounted() {
    this.loading = false
    this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
      .then(() => {
        this.loading = false
        this.$loadScript('/daon/daon.js').then(() => {
          this.$loadScript('/daon/3dfl/labels.js').then(() => {
            this.$loadScript('/daon/3dfl/Daon.FaceLiveness3D.min.js').then(
              () => {
                this.$loadScript('/daon/3dfl/animation.js').then(() => {
                  this.$loadScript('/daon/3dfl/ui.js').then(() => {
                    this.$loadScript('/daon/3dfl/3dflClient_withlib.js').then(
                      () => {
                        setTimeout(() => {
                          const el = document.querySelector('#liveness-result')
                          el.addEventListener('click', this.getLivenessResult)
                        }, 1500)
                      }
                    )
                  })
                })
              }
            )
          })
        })
      })
      .catch((err) => {
        // Failed to fetch script
        this.loading = false
        let errorMessage = 'Network Error'
        // Error Message from Backend
        if (err && !err.response) {
          errorMessage = String(err)
          this.$toast.open({
            message: `<p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }
        // eslint-disable-next-line no-prototype-builtins
        if (err && err.hasOwnProperty('response')) {
          const res = err.response
          // eslint-disable-next-line no-prototype-builtins
          if (res.hasOwnProperty('data')) {
            errorMessage = res.data.errorMessage
            if (!errorMessage) {
              errorMessage =
                'No response was received from the server...please try again'
            }
          } else {
            errorMessage =
              'No response was received from the server...please try again'
          }

          this.$toast.open({
            message: `<p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
        }
      })
  },
  methods: {
    livenessCheckHandler() {
      document.getElementById('videocontainer').style.opacity = '1'
      document.getElementById('videocontainer').style.color = '#000000'
      document.querySelector('#btn-start-session').click()
    },
    getLivenessResult() {
      this.livenessCapture = document.querySelector('#liveness-result').value
    },
    async saveLivenessCheck() {
      const payload = {
        requestId: this.$cookies.get('requestId'),
        base64Video: this.livenessCapture,
      }
      this.accountCreation = true
      let errorMessage = 'Network Error'
      try {
        const { response } = await this.$axios.$post(
          '/individual/videoFaceEvaluation',
          payload
        )
        this.accountNumberHandler(response)
        this.$router.replace('/user/individual/weldone')
      } catch (err) {
        this.accountCreation = false

        if (err && !err.response) {
          errorMessage = String(err)
          const customMessage =
            'please click the start session button to try again'
          this.$toast.open({
            message: `<p class="toast-title">${errorMessage} </p>
                    <p class="toast-msg"> ${customMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          document.getElementById('videocontainer').style.opacity = '0.04'
          document.getElementById('videocontainer').style.color = '#ed143d'
          document.getElementById('instructions').innerHTML =
            '3D-Liveness check failed. Please try again'
          return
        }
        // eslint-disable-next-line no-prototype-builtins
        if (err && err.hasOwnProperty('response')) {
          const res = err.response
          // eslint-disable-next-line no-prototype-builtins
          if (res.hasOwnProperty('data')) {
            errorMessage = res.data.errorMessage
            if (!errorMessage) {
              errorMessage =
                'No response was received from the server...please try again'
            }
          } else {
            errorMessage =
              'No response was received from the server...please try again'
          }

          this.$toast.open({
            message: `<p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
        }
      }
    },
    ...mapActions({
      accountNumberHandler: 'individualModule/SAVE_ACCOUNT_NUMBER',
    }),
  },
}
</script>
<style scoped>
@media screen and (orientation: landscape) {
  body {
    --cam-width: 640px;
    --cam-height: 480px;
  }
}

@media screen and (orientation: portrait) {
  body {
    --cam-width: 480px;
    --cam-height: 640px;
  }
}

html {
  height: 100%;
  margin: 0;
}

body {
  /* width: 100%; */
  background-color: rgb(228, 227, 215);
  text-align: center;
  height: 100%;
  margin: 0;
}

.video {
  background: transparent !important;
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

#liveness-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 10px;
}

#clientcontainer {
  margin: 0 auto;
  border: none !important;
  padding: 2px;
  width: 50%;
  min-width: calc(var(--cam-width) + 30px);
}

#videocontainer {
  position: relative;
  width: calc(var(--cam-width) + 2px);
  height: calc(var(--cam-height) + 2px);
  margin: 0 auto;
  background: transparent !important;
}

video {
  background: transparent !important;
  border: none !important;
  position: relative;
  top: 0;
  left: 0;
  width: 100% !important;
  height: var(--cam-height);
  transform: rotateY(180deg);
  object-fit: cover;
}

.displaycanvas {
  background: transparent !important;
  border: none !important;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: var(--cam-height);
  pointer-events: none;
  object-fit: cover;
  transform: rotateY(180deg);
}
.displaycanvas label {
  margin-top: 4px !important;
}

.container_visible {
  display: block;
}

.container_invisible {
  display: none;
}

.info_col1,
.info_col2 {
  font-size: 75%;
  position: absolute;
  display: block;
  color: white;
}

.info_col1 {
  text-align: right;
  right: 10px;
}

.info_col2 {
  text-align: left;
  left: 10px;
  display: none;
}

#versionstr {
  top: 10px;
}

#nbcaptures {
  top: 25px;
}

#dimensions {
  top: 10px;
}

#timingTracker {
  top: 25px;
}

#timingAnalysis {
  top: 40px;
}

#ied {
  top: 55px;
}

#instructions {
  font-size: 13px !important;
  padding-bottom: 10px;
  font-weight: bold !important;
  text-align: center !important;
}

#instructions_on_face {
  position: absolute;
  margin: 0;
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  font-family: monospace;
  color: cyan;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#btn-settings {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 0.5em;
  font-size: 1em;
}

input:disabled + label {
  color: #999;
}

#buttonscontainer {
  text-align: left;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 0;
  z-index: -1;
}

#btn-start-session {
  padding: 0.7em 0.5em;
  font-size: 1.2em;
}

#score3dfl {
  width: 100%;
  font-size: 9px;
  display: inline-block;
}

.panel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 220px;
  height: 210px;
  background: rgb(228, 227, 215);
  padding: 0px 0px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 5px;
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  z-index: 50;
}

.panel ul {
  text-align: left;
  list-style-type: none;
  list-style-position: outside;
  padding: 0;
  margin: 16px 5px;
}

.panel ul select {
  margin: 16px 5px 5px 5px;
}

.panel button {
  margin: 0.5em;
}

.page_container {
  padding: -11px 100px 0 100px;
}

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

.canvas {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  transform: scaleX(-1);
  background: transparent !important;
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
  position: absolute;
  left: 0;
  z-index: -1;
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

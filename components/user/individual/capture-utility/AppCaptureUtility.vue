<template>
  <div v-if="!loading">
    <div>
      <div>
        <label
          >Doc type:
          <select id="doc-type" onchange="onSelectChange(this.value)">
            <option value="PASSPORT" selected>PASSPORT</option>
            <option value="ID_CARD">ID_CARD</option>
          </select>
        </label>
        <div>
          Url:
          <input id="url" type="text" onchange="onUrlChange(this.value)" />
        </div>
        <label
          >Width:
          <input
            id="width"
            type="number"
            value="400"
            min="10"
            onchange="onWidthChange(this.value)"
          />
        </label>
      </div>
      <div class="container">
        <canvas></canvas>
      </div>
      <div class="select">
        <label for="videoSource">Video source: </label
        ><select id="videoSource" onchange="restart()"></select>
      </div>

      <p>Response:</p>
      <pre></pre>
      <p>Sent image:</p>
      <img id="img-sent" />
      <p>Processed image from server:</p>
      <img id="img-processed" />
    </div>

    <button id="buttonscontainer" onclick="capture()">Capture</button>
    <AppButton title="Capture" @click="submitCaptureHandler" />
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
        this.$loadScript('/daon/doc/Daon.DocumentCapture.min.js').then(() => {
          this.$loadScript('/daon/doc/app.js').then(() => {
            console.log('dependencies loaded')
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
    submitCaptureHandler() {
      //  this.$emit('submitCapturehandler')
      document.querySelector('#buttonscontainer').click()
    },
    getImage(data) {
      console.log(data, 'IMAGE DATA')
    },
  },
}
</script>
<style scoped>
input {
  width: 90%;
}
label {
  display: block;
  font-family: 'GothamThin', sans-serif;
  font-style: normal;
  font-size: 10px;
  color: #2e434e;
  font-weight: 600;
  opacity: 0.7;
  padding: 2px 1px;
}
.container {
  position: relative;
  width: 100%;
}
img {
  width: 100%;
}
#url-container,
#url {
  width: 90%;
}
select {
  display: inline-block;
  width: 100%;
  float: left;
}
canvas {
  width: 100%;
  height: auto;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
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
.select,
p,
pre,
img,
div {
  width: 100%;
  height: auto;
  display: inline-block;
  font-size: 10px;
}
pre {
  padding: 0.5rem;
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #fdb813;
  right: 1.125em;
  z-index: 4;
  margin-top: 6px;
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
</style>

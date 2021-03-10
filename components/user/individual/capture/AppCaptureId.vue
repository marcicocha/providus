<template>
  <div v-if="!loading">
    <div>
      <div id="control">
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
        <div class="select">
          <label for="videoSource">Video source: </label
          ><select id="videoSource" onchange="restart()"></select>
        </div>
        <p>Response:</p>
        <pre></pre>
        <p>Sent image:</p>
        <p>Processed image from server:</p>
        <img id="img-processed" />
        <button id="restartvideo" onclick="restart()">Restart</button>
        <button id="stopcamera" onclick="restart()">Stop Camera</button>
        <button id="buttonscontainer" onclick="capture()">Capture</button>
      </div>
      <div class="container">
        <canvas></canvas>
        <img v-show="isCaptured" id="img-sent" />
      </div>
    </div>

    <AppButton
      v-if="!isCaptured"
      title="Capture"
      @click="submitCaptureHandler"
    />

    <div v-if="isCaptured" class="columns is-mobile">
      <div class="column">
        <AppButton title="Recapture" color="secondary" @click="returnHandler" />
      </div>
      <div class="column">
        <AppButton
          title="Save &amp; Continue"
          :loading="formLoading"
          @click="nextHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureId',
  components: {
    AppButton,
  },
  data() {
    return {
      loading: true,
      isCaptured: false,
      imgSrc: '',
      formLoading: false,
    }
  },
  mounted() {
    this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
      .then(() => {
        this.loading = false
        this.$loadScript('/daon/doc/Daon.DocumentCapture.min.js').then(() => {
          this.$loadScript('/daon/doc/app.js').then(() => {})
        })
      })
      .catch((err) => {
        // Failed to fetch script
        this.loading = false
        let errorMessage = ''

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
        this.$unloadScript('/daon/doc/Daon.DocumentCapture.min.js').then(() => {
          this.$unloadScript('/daon/doc/app.js').then(() => {})
        })
      })
      .catch((err) => {
        let errorMessage = ''

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
  destroyed() {
    this.unloadScript()
  },
  methods: {
    submitCaptureHandler() {
      //  this.$emit('submitCapturehandler')
      document.querySelector('#buttonscontainer').click()
      this.isCaptured = true
      setTimeout(() => {
        this.imgSrc = document.querySelector('#img-sent').src
      }, 500)
    },
    getImage(data) {},
    returnHandler() {
      this.imgSrc = ''
      this.isCaptured = false
      // document.querySelector('#restartvideo').click()
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    async nextHandler() {
      try {
        // const file = new File([this.imgSrc], 'selfie.jpeg', {
        //   lastModified: new Date().getTime(),
        //   type: 'image/jpeg',
        // })
        this.formLoading = true
        const blob = document.blob
        const file = new File([blob], 'id.jpg', {
          lastModified: new Date().getTime(),
          type: 'image/jpeg',
        })
        // console.log(await this.toBase64(file), 'FILE', { document })
        const requestId = this.$cookies.get('requestId')
        const idObject = this.$cookies.get('idObject')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('requestId', requestId)
        formData.append('issuedDate', idObject.issuedDate)
        formData.append('expiryDate', idObject.expiryDate)
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        await this.$axios.$post('/individual/idCardUpload', formData, config)

        document.querySelector('#stopcamera').click()
        this.formLoading = false
        this.unloadScript()
        this.$router.replace('/user/individual/upload-utility')
      } catch (err) {
        this.formLoading = false
        let errorMessage
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          const validationError = res.data.fieldValidationErrors
            ? res.data.fieldValidationErrors
            : []
          if (validationError === [] || !validationError) {
            this.$toast.open({
              message: `<p class="toast-msg"> ${errorMessage} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
            return
          }
          validationError.forEach((element) => {
            this.$toast.open({
              message: `<p class="toast-msg"> ${element.message} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
          })
        }
      }
    },
    loadScript() {
      this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
        .then(() => {
          this.loading = false
          this.$loadScript('/daon/doc/Daon.DocumentCapture.min.js').then(() => {
            this.$loadScript('/daon/doc/app.js').then(() => {
              document.querySelector('#restartvideo').click()
            })
          })
        })
        .catch((err) => {
          // Failed to fetch script
          this.loading = false
          let errorMessage = ''

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
    unloadScript() {
      this.$unloadScript('https://webrtc.github.io/adapter/adapter-latest.js')
        .then(() => {
          this.$unloadScript('/daon/doc/Daon.DocumentCapture.min.js').then(
            () => {
              this.$unloadScript('/daon/doc/app.js').then(() => {})
            }
          )
        })
        .catch((err) => {
          let errorMessage = ''

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
.form_field {
  visibility: hidden;
  position: absolute;
  top: 0;
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
.select {
  visibility: hidden;
}
#buttonscontainer,
#control {
  text-align: left;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 0;
  z-index: -1;
}
#img-sent {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  transform: scaleX(-1);
}
</style>

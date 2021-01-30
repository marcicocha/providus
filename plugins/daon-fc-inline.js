const width = 1280
const height = 720

const video = document.querySelector('video')
const text = document.querySelector('#video-settings')
const feedback = document.querySelector('#feedback')

const videoSelect = document.querySelector('select#videoSource')
const selectors = [videoSelect]

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map((select) => select.value)
  selectors.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild)
    }
  })
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i]
    const option = document.createElement('option')
    option.value = deviceInfo.deviceId

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`
      videoSelect.appendChild(option)
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (
      Array.prototype.slice
        .call(select.childNodes)
        .some((n) => n.value === values[selectorIndex])
    ) {
      select.value = values[selectorIndex]
    }
  })
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError)

// eslint-disable-next-line no-undef
const fc = new Daon.FaceCapture({
  url: 'https://{faceQualityUrl}',
})

video.onloadedmetadata = function () {
  document.querySelector('#start-capture').disabled = false
  document.querySelector('#find-face').disabled = false
  const settings = video.srcObject.getVideoTracks()[0].getSettings()

  text.innerHTML =
    'Width: ' +
    settings.width +
    '; video width: ' +
    video.videoWidth +
    ' (asked for ' +
    width +
    ') Height: ' +
    settings.height +
    ' (asked for ' +
    height +
    ')'
  document.querySelector('#settings').textContent = JSON.stringify(
    settings,
    4,
    4
  )
  fc.startFaceDetector({
    urlFaceDetectorWasm: window.location.origin + '/DaonFaceQualityLite.wasm',
    onFaceDetectorInitialized() {
      console.log('DEMO FaceDetector initialized')
    },
    onFaceDetectorError() {
      console.log('DEMO FaceDetector error')
    },
    onFaceDetection(coords) {
      document.querySelector('#face-coords').textContent = JSON.stringify(
        coords
      )
      // console.log("DEMO face detection result", coords)
    },
  })
}

function startCamera() {
  fc.startCamera(video) // cameraId is optional
}

function handleError(error) {
  console.log(
    'navigator.MediaDevices.getUserMedia error: ',
    error.message,
    error.name
  )
}

let iteration = 0

function capture() {
  fc.startAutoCapture(
    (res) => {
      const text = 'result: ' + res.result + '; feedback: ' + res.feedback
      console.log(++iteration + ' Received data: ' + text)
      feedback.textContent = text
    },
    (err) => {
      feedback.textContent = err
    }
  )
}

function stopCapture() {
  fc.stopCamera()
}

function captureSingle() {
  fc.captureFrame().then((blob) => {
    document.querySelector('#image').src = URL.createObjectURL(blob)
  })
}

function findFace() {
  const imageData = fc.findFace()
  console.log(imageData)
}

function restart() {
  stopCapture()
  const videoSource = videoSelect.value
  fc.startCamera(video, videoSource)
}

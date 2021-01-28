const fc = new Daon.FaceCapture({
  url:
    'http://localhost:5000/https://emea.identityx-cloud.com:8099/rest/v1/quality/assessments',
})
if (fc) {
  console.log('ive been invoked')
}

function getCanvasId() {
  let id = document.getElementById('face-detected-cv')
  if (!id) {
    setTimeout(() => {
      id = document.getElementById('face-detected-cv')
      if (!id) {
        setTimeout(() => {
          id = document.getElementById('face-detected-cv')
        }, 3000)
      }
    }, 3000)
  }
  return id
}

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

function startCamera() {
  // fc.startCamera(video, cameraId); //cameraId is optional
  fc.startCamera(video)
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
    
  }).catch(error => {
    console.log(error);
  }) // this is the catch we added
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

const c = getCanvasId()
const ctx = c.getContext('2d')

const width = 1280
const height = 720

const video = document.querySelector('video')
const text = document.querySelector('#video-settings')
const feedback = document.querySelector('#feedback')

const videoSelect = document.querySelector('select#videoSource')
const selectors = [videoSelect]

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError)

video.onloadedmetadata = function () {
  document.querySelector('#start-capture').disabled = false
  document.querySelector('#find-face').disabled = false
  const settings = video.srcObject.getVideoTracks()[0].getSettings()
  c.width = video.videoWidth
  c.height = settings.height

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
  // document.querySelector("#settings").innerText = JSON.stringify(settings, 4, 4);
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
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.lineWidth = '3'
      ctx.strokeStyle = '#0FEB13'
      ctx.beginPath()
      ctx.rect(coords.x, coords.y, coords.width, coords.height)
      ctx.stroke()
      // console.log("DEMO face detection result", coords)
    },
  })
}

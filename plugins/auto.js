const width = 1280, height = 720;

const video = document.querySelector("video");
const text = document.querySelector("#video-settings");
const feedback = document.querySelector("#feedback");

const videoSelect = document.querySelector('select#videoSource');
const selectors = [videoSelect];

const c = document.getElementById("face-detected-cv");
const ctx = c.getContext("2d");


function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

let fc = new Daon.FaceCapture({
  url: "http://localhost:5000/https://emea.identityx-cloud.com:8099/rest/v1/quality/assessments"
});

video.onloadedmetadata = function () {

  document.querySelector("#start-capture").disabled = false;
  document.querySelector("#find-face").disabled = false;
  const settings = video.srcObject.getVideoTracks()[0].getSettings();
  c.width = video.videoWidth;
  c.height = settings.height;

  text.innerHTML = "Width: " + settings.width + "; video width: " + video.videoWidth + " (asked for " + width + ") Height: " + settings.height + " (asked for " + height + ")";
  //document.querySelector("#settings").innerText = JSON.stringify(settings, 4, 4);
  fc.startFaceDetector({
    urlFaceDetectorWasm: window.location.origin + "/DaonFaceQualityLite.wasm",
    onFaceDetectorInitialized: function () {
      console.log("DEMO FaceDetector initialized")
    },
    onFaceDetectorError: function () {
      console.log("DEMO FaceDetector error")
    },
    onFaceDetection: function (coords) {
      document.querySelector("#face-coords").innerText = JSON.stringify(coords)
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.lineWidth = "3";
      ctx.strokeStyle = '#0FEB13';
      ctx.beginPath();
      ctx.rect(coords.x, coords.y, coords.width, coords.height);
      ctx.stroke();
      // console.log("DEMO face detection result", coords)
    }
  });
}

function startCamera() {
  //fc.startCamera(video, cameraId); //cameraId is optional
  fc.startCamera(video); 
}


function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}


var iteration = 0;

function capture() {
  fc.startAutoCapture((res) => {
    const text = "result: " + res.result + "; feedback: " + res.feedback
    console.log(++iteration + " Received data: " + text)
    feedback.innerText = text
  }, (err) => {
    feedback.innerText = err;
  });
}

function stopCapture() {
  fc.stopCamera();
}

function captureSingle() {
  fc.captureFrame().then(blob => {
    document.querySelector("#image").src = URL.createObjectURL(blob)
  })
}

function findFace() {
  const imageData = fc.findFace();
  console.log(imageData)
}

function restart() {
  stopCapture();
  const videoSource = videoSelect.value;
  fc.startCamera(video, videoSource);
}

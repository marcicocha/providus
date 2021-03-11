startButton = document.querySelector('#btn-start-session')
renderCanvas = document.querySelector('#rendercanvas')
renderCanvasCtx = renderCanvas.getContext('2d')
outlineCanvas = document.querySelector('#motioncanvas')
outlineCanvasCtx = outlineCanvas.getContext('2d')
instrElem = document.getElementById('instructions')
instrFaceElem = document.getElementById('instructions_on_face')
panelSettings = document.getElementById('settingsdiv')
iedElem = document.getElementById('ied')
dimensionsElem = document.getElementById('dimensions')
timingTrackerElem = document.getElementById('timingTracker')
timingAnalysisElem = document.getElementById('timingAnalysis')
showExtraInfoCheckBox = document.getElementById('showextrainfo')
video = document.querySelector('video')

faceBox = null
nbCaptures = 0
blackCanvas = false
showFaceBox = document.getElementById('displayfacebox').checked
iOS = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform)

if (iOS) {
  document.getElementById('allowh264').disabled = true
}

DFQ_WASM = window.location.origin + '/DaonFaceQualityLite.wasm'
f3d = new Daon.FaceLiveness3D(DFQ_WASM)

startButton.disabled = true // until 3DFL is ready

startButton.onclick = function () {
  startButton.disabled = true
  const scoreElem = document.getElementById('score3dfl')
  scoreElem.textContent = 'Liveness:'
  scoreElem.style.color = 'black'
  outlineImage = outlineImageRed
  outlineCanvasCtx.setTransform(1, 0, 0, 1, 0, 0)
  drawOutline()
  blackCanvas = false
  drawRenderCanvas()
  setTimeout(() => f3d.startSession(), 500)
}

document.getElementById('btn-settings-return').onclick = function (e) {
  panelSettings.classList.replace('container_visible', 'container_invisible')
  const config = {
    compression: document.getElementById('jpeglevels').value,
    allowh264: document.getElementById('allowh264').checked,
    useJpegTpl: document.getElementById('forcejpegtpl').checked,
  }

  f3d.setOptionalConfig(config)

  showFaceBox = document.getElementById('displayfacebox').checked

  if (!showFaceBox) {
    faceBox = null
    drawRenderCanvas()
  }
}

document.getElementById('btn-settings').onclick = function (e) {
  panelSettings.classList.replace('container_invisible', 'container_visible')
}

setExtraInfoVisibility(showExtraInfoCheckBox.checked)

showExtraInfoCheckBox.onchange = function (e) {
  setExtraInfoVisibility(e.target.checked)
}

function setExtraInfoVisibility(visible) {
  const displayType = visible ? 'block' : 'none'

  dimensionsElem.style.display = displayType
  timingTrackerElem.style.display = displayType
  timingAnalysisElem.style.display = displayType
  iedElem.style.display = displayType
}

navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: {
      width: { ideal: 426 },
      height: { ideal: 320 },
      facingMode: 'user',
    },
  })
  .then((stream) => {
    video.srcObject = stream
  })
  .catch((error) => {
    console.error('Cannot get camera feed', error)
    alert(
      'Unable to get hold of your camera.\nPlease ensure no other page/app is using it and reload.'
    )
  })

video.onloadedmetadata = function () {
  finishSetup(video)
}

function finishSetup(video) {
  if (video.videoWidth == 0) {
    console.log('video.videoWidth == 0, waiting')
    setTimeout(finishSetup, 100)
    return
  }

  console.log('finishing setup')
  updateVideoUI() // sets width and height of all canvas, and mWidth/mHeight

  const track = video.srcObject.getVideoTracks()[0]
  const actualConstraints = track.getConstraints()
  console.log('Result constraints: ' + JSON.stringify(actualConstraints))

  video.play()
  displayVideoDimensions()

  f3d.setOptionalConfig({
    allowh264: document.getElementById('allowh264').checked,
  })

  drawRenderCanvas() // to get the black side-bars during landscape captures

  f3d.initialize({
    mWidth,
    mHeight,
    video,
    onUpdate,
    onTemplateCreated,
    movementDelay: 1500,
    movementDuration: 3000,
  })
  f3d.startProcessing()
}

function onUpdate(updateType, additional_data) {
  const TYPES = Daon.FaceLiveness3D.UPDATE_TYPES
  switch (updateType) {
    case TYPES.ERROR:
      if (additional_data) {
        alert('3DFL returned an error: ' + additional_data)
      } else {
        alert('3DFL returned an error.')
      }
      break

    case TYPES.READY:
      startButton.disabled = false
      startButton.textContent = 'Start Session'
      instrElem.textContent = labels.instr_str_start
      instrFaceElem.textContent = labels.instr_str_none
      instrFaceElem.style.color = 'cyan'
      break

    case TYPES.AWAIT_RESULTS:
      instrElem.textContent = labels.instr_str_await_results
      instrFaceElem.textContent = labels.instr_str_analysing
      instrFaceElem.style.color = 'cyan'
      blackCanvas = true
      drawRenderCanvas()
      break

    case TYPES.END_CAPTURE:
      instrElem.textContent = labels.instr_str_none
      instrFaceElem.textContent = labels.instr_str_none

      break

    case TYPES.NOT_CENTERED:
      if (instrElem.textContent !== labels.instr_str_not_centered) {
        instrElem.textContent = labels.instr_str_not_centered
        instrFaceElem.innerHTML = labels.instr_str_not_centered_ml
      }
      break

    case TYPES.TOO_FAR:
      if (instrElem.textContent !== labels.instr_str_too_far) {
        instrElem.textContent = labels.instr_str_too_far
        instrFaceElem.innerHTML = labels.instr_str_too_far
      }
      break

    case TYPES.TOO_CLOSE:
      if (instrElem.textContent !== labels.instr_str_too_close) {
        instrElem.textContent = labels.instr_str_too_close
        instrFaceElem.innerHTML = labels.instr_str_too_close
      }
      break

    case TYPES.HOLD:
      outlineImage = outlineImageGreen
      drawOutline()
      instrElem.textContent = labels.instr_str_hold
      instrFaceElem.textContent = labels.instr_str_hold
      instrFaceElem.style.color = 'lime'
      break

    case TYPES.MOVE_CLOSER:
      instrElem.textContent = labels.instr_str_move
      instrFaceElem.innerHTML = labels.instr_str_move_ml
      instrFaceElem.style.color = 'lime'
      startAnimation(2300)
      break

    case TYPES.FACE_BOX:
      // update ied display
      iedElem.textContent =
        'face width: ' +
        Math.round(additional_data ? additional_data.width : '')
      if (showFaceBox && faceBox !== additional_data) {
        faceBox = additional_data
        drawRenderCanvas()
      }
      break
  }
}

function updateVideoUI() {
  mWidth = video.videoWidth
  mHeight = video.videoHeight

  const body = document.querySelector('body')
  body.style.setProperty('--cam-width', mWidth + 'px')
  body.style.setProperty('--cam-height', mHeight + 'px')

  video.height = mHeight
  video.width = mWidth
  renderCanvas.width = mWidth
  renderCanvas.height = mHeight
  outlineCanvas.width = mWidth
  outlineCanvas.height = mHeight
}

function drawRenderCanvas() {
  if (blackCanvas) {
    renderCanvasCtx.strokeStyle = 'black'
    renderCanvasCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height)
    return
  }

  renderCanvasCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height)

  if (renderCanvas.width > renderCanvas.height) {
    renderCanvasCtx.strokeStyle = 'black'
    renderCanvasCtx.fillRect(0, 0, 140, 480)
    renderCanvasCtx.fillRect(140 + 360 + 1, 0, 140, 480)
  }

  // draw face box
  if (faceBox) {
    renderCanvasCtx.strokeStyle = 'white'
    renderCanvasCtx.strokeRect(
      faceBox.x,
      faceBox.y,
      faceBox.width,
      faceBox.height
    )
  }
}

function displayVideoDimensions() {
  if (video.videoWidth) {
    dimensionsElem.textContent =
      '' + video.videoWidth + ' x ' + video.videoHeight
  } else {
    dimensionsElem.textContent = '-- x --'
  }
}

function onTemplateCreated(tpl) {
  // postSessionData(tpl);
  console.log('Template Result:', tpl)

  // Convert response to Base64
  let base64 = btoa(
    new Uint8Array(tpl).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )
  const livenessButton = document.querySelector('#liveness-result')
  livenessButton.value = base64
  setTimeout(() => {
    livenessButton.click()
  }, 500)

  // console.log("Template Result Converted:", base64)

  if (f3d.isInitialized()) {
    startButton.disabled = false
  }
}

function postSessionData(tpl) {
  const tplFile = new Blob([tpl], { type: 'application/octet-stream' })
  // let keepTpl = document.getElementById('keeptplcheck').checked;

  const formData = new FormData()
  formData.append('tpl_3dfl', tplFile)
  // formData.append('keep_tpl', keepTpl);

  xhr(
    'https://web3dfl-demo.identityx-cloud.com/process3dfl',
    formData,
    (res) => {
      let resJSON = null
      if (res != null) {
        resJSON = JSON.parse(res)
      }

      onServerResults(resJSON)
    }
  )
}

function xhr(url, data, callback) {
  const request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText)
      } else {
        callback(null)
      }
    }
  }

  request.open('POST', url)
  request.send(data)
}

function onServerResults(resultsObj) {
  if (resultsObj != null) {
    const liveness = resultsObj.result
    let score3dfl = resultsObj.score.daon
    const scorePassive = resultsObj.score.passive
    const qualityStr = resultsObj.qualityStr

    const scoreElem = document.getElementById('score3dfl')
    let qualityStrOut = ''
    if (qualityStr !== 'OK') {
      qualityStrOut = ' -- ' + qualityStr + ' '
    }

    score3dfl = Math.floor(score3dfl * 100) / 100

    if (score3dfl < 0) {
      scoreElem.style.color = 'red'
      scoreElem.textContent = 'Error (' + qualityStr + ' ' + score3dfl + ' )'
    } else if (!liveness) {
      scoreElem.style.color = 'red'
      scoreElem.textContent =
        'Liveness: SPOOF (score: ' + score3dfl + qualityStrOut + ')'
    } else {
      scoreElem.style.color = 'black'
      scoreElem.textContent =
        'Liveness: LIVE (score: ' + score3dfl + qualityStrOut + ')'
    }
  }

  instrElem.textContent = labels.instr_str_start
  instrFaceElem.textContent = labels.instr_str_none
  instrFaceElem.style.color = 'cyan'

  outlineImage = null
  drawOutline() // clears the outline
  blackCanvas = false
  drawRenderCanvas()

  nbCaptures += 1
  document.getElementById('nbcaptures').textContent =
    'nb captures: ' + nbCaptures
}

eventName = iOS ? 'pagehide' : 'beforeunload'
window.addEventListener(eventName, function (e) {
  console.log('3DFL client ' + eventName + ' called')
  if (timing3dflQueryInterval) {
    clearInterval(timing3dflQueryInterval)
  }

  if (f3d) {
    f3d.terminate()
  }
})

// FPS labels
timing3dflQueryInterval = setInterval(refresh3dflTiming, 250)
function refresh3dflTiming() {
  if (f3d.instance) {
    let processingTime = f3d.instance.getTrackerProcessingTime()
    timingTrackerElem.textContent =
      'tracker: ' + Math.round(processingTime) + ' ms'

    processingTime = f3d.instance.getWorkerProcessingTime()
    timingAnalysisElem.textContent =
      'full analysis: ' + Math.round(processingTime) + ' ms'
  }
}

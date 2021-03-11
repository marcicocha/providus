elDocType = document.querySelector('#doc-type')
elWidth = document.querySelector('#width')
elUrl = document.querySelector('#url')
elUrl.value =
  'http://localhost:5000/https://emea.identityx-cloud.com:8087/rest/v1/quality/assessments'
videoSelectNew = document.querySelector('select#videoSource')
selectorsNew = [videoSelectNew]
queryParams = {}
videoNew = null
canvas = document.querySelector('canvas')
doc_type = 'PASSPORT'
overlayWidth = 600
// ID_CARD_RATIO = 1.5858
ID_CARD_RATIO = 1
// PASSPORT_RATIO = 1.4205
PASSPORT_RATIO = 1

dc = new Daon.DocumentCapture({
  url: elUrl.value,
  documentType: doc_type,
})
dc.startCamera().then(({ videoEl }) => {
  document.querySelector('.container').appendChild(videoEl)
  const vid = document.querySelector('video')
  vid.classList.add('screenie')
  videoEl.onloadedmetadata = function () {
    canvas.width = videoEl.videoWidth
    canvas.height = videoEl.videoHeight
    elWidth.value = overlayWidth = Math.ceil(canvas.width * 0.8)

    draw()
  }
})

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectorsNew.map((select) => select.value)
  selectorsNew.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild)
    }
  })
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i]
    const option = document.createElement('option')
    option.value = deviceInfo.deviceId

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelectNew.length + 1}`
      videoSelectNew.appendChild(option)
    }
  }
  selectorsNew.forEach((select, selectorIndex) => {
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
  dc.startCamera(videoNew)
}

function handleError(error) {
  console.log(
    'navigator.MediaDevices.getUserMedia error: ',
    error.message,
    error.name
  )
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError)

function restart() {
  dc.stopCamera()
  const videoSource = videoSelectNew.value
  dc.startCamera(videoNew, videoSource)
}

function stopCamera() {
  dc.stopCamera()
}

function draw() {
  const {
    upperLeftX,
    upperLeftY,
    width,
    height,
  } = (queryParams = getQueryParams())
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = 'transparent'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.rect(upperLeftX, upperLeftY, width, height)
  ctx.stroke()
}

function onSelectChange(e) {
  dc.config.documentType = doc_type = e
  doc_type = e
  draw()
}

function onWidthChange(e) {
  overlayWidth = e
  draw()
}

function onUrlChange(e) {
  dc.config.url = e
  draw()
}

function getQueryParams() {
  const overlayHeight =
    doc_type === 'PASSPORT'
      ? overlayWidth / PASSPORT_RATIO
      : overlayWidth / ID_CARD_RATIO
  return {
    upperLeftX: Math.round((canvas.width - overlayWidth) / 2),
    upperLeftY: Math.round((canvas.height - overlayHeight) / 2)
      ? Math.round((canvas.height - overlayHeight) / 2)
      : 1,
    width: overlayWidth,
    height: Math.round(overlayHeight),
  }
}

imgSent = document.querySelector('#img-sent')
imgSent.onload = function () {
  URL.revokeObjectURL(imgSent.src)
  document.querySelector('#img-processed').src = undefined
}

function capture() {
  // document.querySelector('pre').innerText = ''
  // dc.captureFrame()
  //   .then((blob) => {
  //     const src = URL.createObjectURL(blob)
  //     document.querySelector('#img-sent').src = src
  //     return dc.assessQuality(blob, queryParams)
  //   })
  //   .then(onServerFeedback)
  //   .catch(onServerError)

  // Marcia edit
  dc.captureFrame()
    .then((blob) => {
      const src = URL.createObjectURL(blob)
      document.querySelector('#img-sent').src = src
      document.blob = blob;
      return dc.assessQuality(blob, queryParams)
    })
}

function onServerFeedback(response) {
  let text = ''
  if (typeof response === 'object') text = JSON.stringify(response, false, 2)
  else {
    text = response
  }
  document.querySelector('pre').innerText = text
  if (response && response.responseBase64Image) {
    document.querySelector('#img-processed').src =
      'data:image/png;base64,' + response.responseBase64Image
  }
}

function onServerError(response) {
  document.querySelector('pre').innerText = response
}


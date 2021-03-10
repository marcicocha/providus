let outlineImageGreen = new Image()
outlineImageGreen.src = '/frame_overlay_far_green.png'
let outlineImageRed = new Image()
outlineImageRed.src = '/frame_overlay_far_red.png'
let outlineImage = null

function drawOutline() {
  if (outlineImage && !outlineImage.complete) {
    outlineImage.onload = drawOutline()
    return
  }

  outlineCanvasCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height)

  if (outlineImage) {
    let scale = 0.45
    if (outlineCanvas.width < outlineCanvas.height) {
      scale = 0.65
    }

    const dx = (outlineCanvas.width - outlineImage.width * scale) / 2
    const dy = (outlineCanvas.height - outlineImage.height * scale * 1.4) / 2

    outlineCanvasCtx.globalAlpha = 0.7
    outlineCanvasCtx.drawImage(
      outlineImage,
      dx,
      dy,
      outlineImage.width * scale,
      outlineImage.height * scale * 1.4
    )
  }
}

let animationStartTS = 0
let animationStopTS = 0
const animationStepDuration = 40 // 25fps
let animationScalePerSec = 1

function startAnimation(duration) {
  animationStartTS = performance.now()
  animationStopTS = animationStartTS + duration

  animationScalePerSec = ((1.6 - 1) / duration) * 1000
  stepAnimation()
}

function stepAnimation() {
  const currentTS = performance.now()
  if (currentTS < animationStopTS) {
    const newScale =
      1 + (animationScalePerSec * (currentTS - animationStartTS)) / 1000

    // draw outline with the correct scale
    outlineCanvasCtx.setTransform(
      newScale,
      0,
      0,
      newScale,
      (-outlineCanvas.width * (newScale - 1)) / 2,
      (-outlineCanvas.height * (newScale - 1)) / 2
    )
    drawOutline()

    setTimeout(stepAnimation, animationStepDuration)
  } else {
    console.log('skip stepAnimation')
  }
}


var outlineImageGreen = new Image();
outlineImageGreen.src = 'frame_overlay_far_green.png';
var outlineImageRed = new Image();
outlineImageRed.src = 'frame_overlay_far_red.png';
var outlineImage = null;


function drawOutline() {

  if (outlineImage && !outlineImage.complete) {
    outlineImage.onload = drawOutline();
    return;
  }

  outlineCanvasCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);

  if (outlineImage) {
    let scale = 0.55;
    if (outlineCanvas.width < outlineCanvas.height) {
      scale = 0.75;
    }

    let dx = (outlineCanvas.width - outlineImage.width * scale) / 2;
    let dy = (outlineCanvas.height - outlineImage.height * scale * 1.4) / 2;

    outlineCanvasCtx.globalAlpha = 0.7;
    outlineCanvasCtx.drawImage(outlineImage, dx, dy,
      outlineImage.width * scale,
      outlineImage.height * scale * 1.4);
  }
}

var animationStartTS = 0;
var animationStopTS = 0;
var animationStepDuration = 40; // 25fps
var animationScalePerSec = 1;

function startAnimation(duration) {
  animationStartTS = performance.now();
  animationStopTS = animationStartTS + duration;

  animationScalePerSec = (1.6 - 1) / duration * 1000;
  stepAnimation();
}

function stepAnimation() {
  const currentTS = performance.now();
  if (currentTS < animationStopTS) {
    let newScale = 1 + animationScalePerSec * (currentTS - animationStartTS) / 1000;

    // draw outline with the correct scale
    outlineCanvasCtx.setTransform(newScale, 0, 0, newScale, -outlineCanvas.width * (newScale - 1) / 2, -outlineCanvas.height * (newScale - 1) / 2);
    drawOutline();

    setTimeout(stepAnimation, animationStepDuration);
  }
  else {
    console.log('skip stepAnimation');
  }

}
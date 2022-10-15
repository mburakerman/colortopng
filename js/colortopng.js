window.onload = function () {
    document.getElementById("preloader").style.display = "none";
    document.querySelector(".page-wrapper").style.visibility = "visible";
    document.body.style.overflow = "auto";
}

const DEFAULT_DOWNLOAD_WIDTH = 1200;
const DEFAULT_DOWNLOAD_HEIGHT = 1000;


/* ===== SOLID ===== */
const generatorBodySolid = document.querySelector(".generator-body--solid")
const solidTab = document.getElementById("solidTab")

const solidCanvas = document.getElementById("solidCanvas");
const solidCanvasCtx = solidCanvas.getContext("2d");

const solidColorDownloadButton = document.getElementById("solidColorDownloadButton");
const solidColorPicker = document.getElementById("solid_color_picker");

const solidWidthInput = document.getElementById("solid-width-input");
const solidHeightInput = document.getElementById("solid-height-input");

let solidOutputWidth = DEFAULT_DOWNLOAD_WIDTH;
let solidOutputHeight = DEFAULT_DOWNLOAD_HEIGHT;

solidCanvas.setAttribute("width", solidOutputWidth);
solidCanvas.setAttribute("height", solidOutputHeight);
solidWidthInput.value = solidOutputWidth
solidHeightInput.value = solidOutputHeight

solidWidthInput.addEventListener("change", function () {
    solidOutputWidth = this.value
    solidCanvas.setAttribute("width", this.value);
    update(solidColorPicker.value);
}, false);
solidHeightInput.addEventListener("change", function () {
    solidOutputHeight = this.value
    solidCanvas.setAttribute("height", this.value);
    update(solidColorPicker.value);
}, false);


solidColorDownloadButton.addEventListener("click", function () {
    solidColorDownloadButton.href = solidCanvas.toDataURL();
    solidColorDownloadButton.download = "colortopng.png";
}, false);



/* ===== GRADIENT ===== */
const generatorBodyGradient = document.querySelector(".generator-body--gradient")
const gradientRadioInputs = document.querySelectorAll(".generator-body--gradient input[type='radio']");
const gradientPositionRadios = document.querySelector(".gradient-position-radios")
const gradientEndPointInputContainer = document.querySelector(".gradient-end-point-input-container")
const gradientEndPointInputContainerRadio = document.querySelector(".gradient-end-point-input-container input[type='radio']")
const gradientCircleRadiusContainer = document.querySelector(".gradient-circle-radius-container")


const gradientCanvas = document.getElementById("gradientCanvas");
const gradientCanvasCtx = gradientCanvas.getContext("2d");

const gradientCanvas2 = document.getElementById("gradientCanvas2");
const gradientCanvas2Ctx = gradientCanvas2.getContext("2d");

const gradientColorDownloadButton = document.getElementById("gradientColorDownloadButton");

const gradientColorPicker1 = document.getElementById("gradientColorPicker1");
const gradientColorPicker2 = document.getElementById("gradientColorPicker2");

const gradientWidthInput = document.getElementById("gradientWidthInput");
const gradientHeightInput = document.getElementById("gradientHeightInput");

let gradientOutputWidth = DEFAULT_DOWNLOAD_WIDTH;
let gradientOutputHeight = DEFAULT_DOWNLOAD_HEIGHT;

gradientCanvas.setAttribute("width", DEFAULT_DOWNLOAD_WIDTH)
gradientCanvas.setAttribute("height", DEFAULT_DOWNLOAD_HEIGHT)

gradientCanvas2.setAttribute("width", gradientOutputWidth)
gradientCanvas2.setAttribute("height", gradientOutputHeight)
gradientWidthInput.value = gradientOutputWidth
gradientHeightInput.value = gradientOutputHeight

gradientWidthInput.addEventListener("change", function () {
    gradientOutputWidth = this.value
    gradientCanvas2.setAttribute("width", this.value);
    update();
}, false);
gradientHeightInput.addEventListener("change", function () {
    gradientOutputHeight = this.value
    gradientCanvas2.setAttribute("height", this.value);
    update();
}, false);

gradientColorDownloadButton.addEventListener("click", function () {
    gradientColorDownloadButton.href = gradientCanvas2.toDataURL();
    gradientColorDownloadButton.download = "colortopng.png";
}, false);



let linearGradientEndpoint = 1;
let radialGradientRadius = 0;

function update() {
    if (generatorBodySolid.clientWidth !== 0) {
        solidCanvasCtx.beginPath();
        solidCanvasCtx.rect(0, 0, solidOutputWidth, solidOutputHeight);
        solidCanvasCtx.fillStyle = '#' + solidColorPicker.value
        solidCanvasCtx.fill();
    } else {
        if (document.getElementById("gradientLinearRadio").checked === true) {
            gradientCircleRadiusContainer.style.display = "none";
            gradientPositionRadios.style.display = "block";
            gradientEndPointInputContainer.style.display = "block";

            const updatelineargradient = function () {
                let linearGradient;
                let linearGradient2;

                if (document.getElementById("linear_gradient_left").checked === true) {
                    linearGradient = gradientCanvasCtx.createLinearGradient(0, 0, DEFAULT_DOWNLOAD_WIDTH * linearGradientEndpoint, 0);
                    linearGradient2 = gradientCanvas2Ctx.createLinearGradient(0, 0,  gradientOutputWidth* linearGradientEndpoint, 0);
                } else if (document.getElementById("linear_gradient_top").checked === true) {
                    linearGradient = gradientCanvasCtx.createLinearGradient(0, 0, 0, DEFAULT_DOWNLOAD_WIDTH * linearGradientEndpoint);
                    linearGradient2 = gradientCanvas2Ctx.createLinearGradient(0, 0, 0,  gradientOutputWidth * linearGradientEndpoint);
                } else if (document.getElementById("linear_gradient_right").checked === true) {
                    linearGradient = gradientCanvasCtx.createLinearGradient(DEFAULT_DOWNLOAD_WIDTH * linearGradientEndpoint, 0, 0, 0);
                    linearGradient2 =  gradientCanvas2Ctx.createLinearGradient( gradientOutputWidth * linearGradientEndpoint, 0, 0, 0);
                } else if (document.getElementById("linear_gradient_bottom").checked === true) {
                    linearGradient = gradientCanvasCtx.createLinearGradient(0, DEFAULT_DOWNLOAD_WIDTH * linearGradientEndpoint, 0, 0);
                    linearGradient2 =  gradientCanvas2Ctx.createLinearGradient(0, gradientOutputWidth  * linearGradientEndpoint, 0, 0);
                }

                linearGradient.addColorStop(0, "#" + gradientColorPicker1.value);
                linearGradient.addColorStop(1, "#" + gradientColorPicker2.value);
                gradientCanvasCtx.fillStyle = linearGradient;
                gradientCanvasCtx.fillRect(0, 0, DEFAULT_DOWNLOAD_WIDTH, DEFAULT_DOWNLOAD_HEIGHT);

                linearGradient2.addColorStop(0, "#" + gradientColorPicker1.value);
                linearGradient2.addColorStop(1, "#" + gradientColorPicker2.value);
                gradientCanvas2Ctx.fillStyle = linearGradient2;
                gradientCanvas2Ctx.fillRect(0, 0, gradientOutputWidth, gradientOutputHeight);
            }
            updatelineargradient()

            document.getElementById("gradientEndPointRadio").addEventListener("input", function () {
                linearGradientEndpoint = this.value
                updatelineargradient();
            });
        } else {
            gradientEndPointInputContainer.style.display = "none";
            gradientPositionRadios.style.display = "none";
            gradientCircleRadiusContainer.style.display = "block";

            const updateradialgradient = function () {
                let radialGradient = gradientCanvasCtx.createRadialGradient(DEFAULT_DOWNLOAD_WIDTH * .5, DEFAULT_DOWNLOAD_HEIGHT * .5, DEFAULT_DOWNLOAD_WIDTH * radialGradientRadius, DEFAULT_DOWNLOAD_WIDTH * .5, DEFAULT_DOWNLOAD_HEIGHT * .5, DEFAULT_DOWNLOAD_WIDTH * .5);
                let radialGradient2 = gradientCanvas2Ctx.createRadialGradient(gradientOutputWidth * .5, gradientOutputHeight * .5, gradientOutputWidth * radialGradientRadius, gradientOutputWidth * .5, gradientOutputHeight * .5, gradientOutputWidth * .5);

                radialGradient.addColorStop(0, "#" + gradientColorPicker1.value);
                radialGradient.addColorStop(1, "#" + gradientColorPicker2.value);
                gradientCanvasCtx.fillStyle = radialGradient;
                gradientCanvasCtx.fillRect(0, 0, DEFAULT_DOWNLOAD_WIDTH, DEFAULT_DOWNLOAD_HEIGHT);

                radialGradient2.addColorStop(0, "#" + gradientColorPicker1.value);
                radialGradient2.addColorStop(1, "#" + gradientColorPicker2.value);
                gradientCanvas2Ctx.fillStyle = radialGradient2;
                gradientCanvas2Ctx.fillRect(0, 0, gradientOutputWidth, gradientOutputHeight);
            }
            updateradialgradient()

            document.getElementById("gradientCircleRadiusRadio").addEventListener("input", function () {
                radialGradientRadius = this.value
                updateradialgradient();
            });
        }
    }
}
update();

gradientRadioInputs.forEach((radioInput) => radioInput.addEventListener("change", update))

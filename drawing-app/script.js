/**
 * @typedef {Object} Position - garph point
 * @property {number} X - x cord
 * @property {number} Y - y cord
 */

/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#board")
let canvasCtx = canvas.getContext("2d")

let brushSize = 5
let brushColor = "#000000"
let isDrawing = false

/** @type {Position} */
let currentPos = {X: 0, Y: 0}
/** @type {Position} */
let prevPos = {X: 0, Y: 0}

function resizeCanvas() {
    const {innerHeight : height, innerWidth : width} = window
    canvas.width = (width - 10) > 768 ? 768 : (width - 10)
    canvas.height = height - 100
}
// bind control panel events
function attach_controller() {
    // brush size
    /** @type {HTMLInputElement} */
    const brushSizeDisplay = document.getElementById("brush_size_display")
    brushSizeDisplay.value = brushSize
    document.getElementById("brush_size_inc").addEventListener("click", () => {
        if(brushSize === 30) return;
        brushSize += 5
        brushSizeDisplay.value = brushSize
    })
    document.getElementById("brush_size_dec").addEventListener("click", () => {
        if(brushSize === 5) return;
        brushSize -= 5
        brushSizeDisplay.value = brushSize
    })
    // brush color
    /** @type {HTMLInputElement} */
    let brushColorPicker = document.getElementById("brush_color_picker")
    brushColorPicker.value = brushColor
    brushColorPicker.addEventListener("input", (event) => {
        brushColor = event.target.value
    })
    brushColorPicker.addEventListener("change", (event) => {
        brushColor = event.target.value
    })
    // clear canvas
    document.getElementById("canvas_clear_btn").addEventListener("click", () => {
        clearCanvas()
    })
}

/**
 * Get Current mouse position for event
 * @param {MouseEvent} event 
 * @returns {Position}
 */
function getCurrentMousePosition(event) {
    return {
        X: event.clientX - canvas.offsetLeft, 
        Y: event.clientY - canvas.offsetTop
    }
}

function draw() {
    canvasCtx.beginPath()
    canvasCtx.strokeStyle = brushColor
    canvasCtx.lineWidth = brushSize
    canvasCtx.lineCap = "round"
    canvasCtx.moveTo(prevPos.X, prevPos.Y)
    canvasCtx.lineTo(currentPos.X, currentPos.Y)
    canvasCtx.stroke()
    canvasCtx.closePath()
}
/**
 * draw a dot on click
 * @param {Number} x 
 * @param {Number} y 
 */
function drawDot(x, y) {
    canvasCtx.beginPath()
    canvasCtx.fillStyle = brushColor
    canvasCtx.arc(x, y, brushSize/2, 0, 2 * Math.PI)
    canvasCtx.fill()
    canvasCtx.closePath()
}

function clearCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
}

function attach_draw_event() {
    canvas.addEventListener("mousemove", (event) => {
        let currPoint = getCurrentMousePosition(event);
        prevPos = currentPos
        currentPos = currPoint
        if(isDrawing) draw()
    })
    canvas.addEventListener("mousedown", (event) => {
        let currPoint = getCurrentMousePosition(event);
        isDrawing = true
        drawDot(currPoint.X, currPoint.Y)
    })
    canvas.addEventListener("mouseup", (event) => {
        isDrawing = false
    })
}

// events
window.addEventListener("load", () => {
    resizeCanvas()
    attach_controller()
    attach_draw_event()
})




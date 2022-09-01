var penColor = "#000";
var penSize = 0.25;
var eraserSize = 10;

window.onload = function () {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");

    // Fill Window Width and Height
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    // Set Background Color
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    // Mouse Event Handlers
    if (myCanvas) {
        var isDown = false;
        var canvasX, canvasY;
        ctx.lineWidth = 1;

        $(myCanvas)
            .mousedown(function (e) {
                isDown = true;
                ctx.beginPath();
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.moveTo(canvasX, canvasY);
            })
            .mousemove(function (e) {
                if (isDown !== false) {
                    canvasX = e.pageX - myCanvas.offsetLeft;
                    canvasY = e.pageY - myCanvas.offsetTop;
                    ctx.lineTo(canvasX, canvasY);
                    ctx.stroke();
                }
            })
            .mouseup(function (e) {
                isDown = false;
                ctx.closePath();
            })

            .click(function () {
                document.getElementById("hiddenDiv").hidden = true;
                document.getElementById("eraserMenu").hidden = true;

            })

    }

    // Touch Events Handlers
    draw = {
        started: false,
        start: function (evt) {

            ctx.beginPath();
            ctx.moveTo(
                evt.touches[0].pageX,
                evt.touches[0].pageY
            );

            this.started = true;

        },
        move: function (evt) {

            if (this.started) {
                ctx.lineTo(
                    evt.touches[0].pageX,
                    evt.touches[0].pageY
                );

                ctx.strokeStyle = "#000";
                // ctx.lineWidth = 50;
                ctx.stroke();
            }

        },
        end: function (evt) {
            this.started = false;
        }
    };

    // Touch Events
    myCanvas.addEventListener('touchstart', draw.start, false);
    myCanvas.addEventListener('touchend', draw.end, false);
    myCanvas.addEventListener('touchmove', draw.move, false);

    // Disable Page Move
    document.body.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
    }, false);

    document.getElementById("colorSelector").value = penColor;
    document.getElementById("widthSelector").value = penSize * 4;
    document.getElementById("eraserWidth").value = eraserSize * 4;

    document.getElementById("colorSelector").addEventListener('change', setColor, false);
    document.getElementById("widthSelector").addEventListener('change', setWidth, false);
    document.getElementById("eraserWidth").addEventListener('change', setEraserWidth, false);

};


function showDiv() {
    document.getElementById("eraserMenu").hidden = true;
    var hiddenDiv = document.getElementById("hiddenDiv");
    if (hiddenDiv.hidden) hiddenDiv.hidden = false;
    else hiddenDiv.hidden = true;
    startPen();
}

function setColor() {
    var clrselec = document.getElementById("colorSelector");
    var clrval = clrselec.value;
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    penColor = clrval;
    ctx.strokeStyle = penColor;
}

function setWidth() {
    var wdtselec = document.getElementById("widthSelector");
    var wdtval = wdtselec.value / 4;
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    penSize = wdtval;
    ctx.lineWidth = penSize + 0.25;
}

function setEraserWidth() {
    var wdtselec = document.getElementById("eraserWidth");
    var wdtval = wdtselec.value / 4;
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    eraserSize = wdtval;
    ctx.lineWidth = eraserSize + 0.25;
}
function eraserMenu() {
    document.getElementById("hiddenDiv").hidden = true;
    var hiddenEraserMenu = document.getElementById("eraserMenu");
    if (hiddenEraserMenu.hidden) hiddenEraserMenu.hidden = false;
    else hiddenEraserMenu.hidden = true;
    startEraser();
}
function startEraser() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = eraserSize + 0.25;
    // document.getElementById("eraserWidth").value = ctx.lineWidth * 4;

    // var wdtval = wdtselec.value / 4;
    // ctx.lineWidth = 10;
}

function startPen() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize + 0.25;
    // document.getElementById("widthSelector").value = ctx.lineWidth * 4;
}

function eraseAll() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

// function Eraser() {
//     var myCanvas = document.getElementById("myCanvas");
//     var ctx = myCanvas.getContext("2d");
//     ctx.strokeStyle = "#fff";
//     document.getElementById("eraserWidth").value = ctx.lineWidth * 4;

//     document.getElementById("hiddenDiv").hidden = true;
//     document.getElementById("eraserMenu").hidden = true;
//     // var wdtval = wdtselec.value / 4;
//     // ctx.lineWidth = 10;
// }

// function Pen() {
//     var myCanvas = document.getElementById("myCanvas");
//     var ctx = myCanvas.getContext("2d");
//     ctx.strokeStyle = document.getElementById("colorSelector").value;
//     document.getElementById("widthSelector").value = ctx.lineWidth * 4;
//     document.getElementById("hiddenDiv").hidden = true;
//     document.getElementById("eraserMenu").hidden = true;
// }
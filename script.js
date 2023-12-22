document.addEventListener('DOMContentLoaded', function() {
    var shortDateElement = document.getElementById('shortDate');
    var textInput = document.getElementById('textInput');
    var drawingCanvas = document.getElementById('drawingCanvas');
    var clearButton = document.getElementById('clearButton');
    var colorPicker = document.getElementById('colorPicker');
    var translationContainer = document.getElementById('translationContainer');
    var translateButton = document.getElementById('translateButton');
    var timerButton = document.getElementById('timerButton');
    var timerDisplay = document.getElementById('timerDisplay');
    var helloContainer = document.getElementById('helloContainer');
    var ctx = drawingCanvas.getContext('2d');
    var isDrawing = false;

    function updateShortDate() {
        var currentDate = new Date();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = currentDate.toLocaleDateString('en-US', options);
        shortDateElement.textContent = 'Short date: ' + formattedDate;
    }

    updateShortDate();
    setInterval(updateShortDate, 1000);

    drawingCanvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
    });

    drawingCanvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            drawOnCanvas(e);
        }
    });

    drawingCanvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    drawingCanvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });

    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    });

    colorPicker.addEventListener('input', function() {
        ctx.strokeStyle = colorPicker.value;
    });

    // translateButton.addEventListener('click', function() {
    //     // Функціонал перекладача може бути доданий за необхідності
    // });

    timerButton.addEventListener('click', function() {
        startTimer();
    });

    function drawOnCanvas(e) {
        ctx.lineTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
        ctx.stroke();
    }

    function startTimer() {
        var timerDuration = 45 * 60; // 45 хвилин у секундах
        var timerInterval = setInterval(function() {
            timerDuration--;
            displayTime(timerDuration);

            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                flashRed(timerButton);
            }
        }, 1000);

        // Викликаємо один раз для ініціалізації відображення
        displayTime(timerDuration);
    }

    function displayTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        timerDisplay.textContent = `Time: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function flashRed(element) {
        var flashes = 3;
        var flashInterval = setInterval(function() {
            if (flashes % 2 === 0) {
                element.style.backgroundColor = '#e74c3c'; // Червоний колір
            } else {
                element.style.backgroundColor = ''; // Скидаємо колір
            }

            flashes--;

            if (flashes === 0) {
                clearInterval(flashInterval);
                element.style.backgroundColor = ''; // Скидаємо колір після закінчення миготіння
            }
        }, 500);
    }
});

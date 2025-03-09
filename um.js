const uyirLessons = [
    { tamil: "அ", transliteration: "a", audio: "audio/a.mp3" },
    { tamil: "ஆ", transliteration: "aa", audio: "audio/aa.mp3" },
    { tamil: "இ", transliteration: "i", audio: "audio/i.mp3" }
];

const maeiLessons = [
    { tamil: "க", transliteration: "ka", audio: "audio/ka.mp3" },
    { tamil: "ங", transliteration: "nga", audio: "audio/nga.mp3" },
    { tamil: "ச", transliteration: "cha", audio: "audio/cha.mp3" }
];

let currentLesson = 0;
let currentLessons = [];

function goToLessons(type) {
    currentLessons = type === 'uyir' ? uyirLessons : maeiLessons;
    document.getElementById("lessonPage").innerHTML = `
        <button onclick="goHome()">🏠 Home</button>
        <h2>${type === 'uyir' ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL"}</h2>
        <div class="progress"><div class="progress-bar" id="progressBar"></div></div>
        <div class="card">
            <h2 id="tamilCharacter"></h2>
            <p id="transliteration"></p>
            <button onclick="playAudio()">🔊 Pronounce</button>
            <canvas id="writingCanvas" width="300" height="300"></canvas>
            <br>
            <button onclick="clearCanvas()">Clear</button>
        </div>
        <br>
        <button id="backBtn" onclick="prevLesson()">Back</button>
        <button id="nextBtn" onclick="nextLesson()">Next</button>
        <audio id="audioPlayer"></audio>
    `;
    document.getElementById("homePage").style.display = "none";
    document.getElementById("lessonPage").style.display = "block";
    currentLesson = 0;
    updateLesson();
}

function goHome() {
    document.getElementById("lessonPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
}

function updateLesson() {
    document.getElementById("tamilCharacter").textContent = currentLessons[currentLesson].tamil;
    document.getElementById("transliteration").textContent = currentLessons[currentLesson].transliteration;
    document.getElementById("audioPlayer").src = currentLessons[currentLesson].audio;
    document.getElementById("progressBar").style.width = ((currentLesson + 1) / currentLessons.length) * 100 + "%";
    clearCanvas();
}

function playAudio() {
    document.getElementById("audioPlayer").play();
}

function nextLesson() {
    if (currentLesson < currentLessons.length - 1) {
        currentLesson++;
        updateLesson();
    }
}

function prevLesson() {
    if (currentLesson > 0) {
        currentLesson--;
        updateLesson();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvas = document.getElementById("writingCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0, lastY = 0;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", draw);

function startDrawing(event) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(event);
}

function stopDrawing() {
    isDrawing = false;
}

function draw(event) {
    if (!isDrawing) return;
    const [x, y] = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.quadraticCurveTo((lastX + x) / 2, (lastY + y) / 2, x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function getCoordinates(event) {
    let x, y;
    if (event.touches) {
        let touch = event.touches[0];
        x = touch.clientX - canvas.getBoundingClientRect().left;
        y = touch.clientY - canvas.getBoundingClientRect().top;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    }
    return [x, y];
}

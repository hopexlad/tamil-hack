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
const canvas = document.getElementById("writingCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function goToLessons(type) {
    currentLessons = type === 'uyir' ? uyirLessons : maeiLessons;
    document.getElementById("lessonTitle").textContent = type === 'uyir' ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL";
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

function startDrawing(event) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(event);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing) return;
    let [x, y] = getCoordinates(event);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function getCoordinates(event) {
    let rect = canvas.getBoundingClientRect();
    if (event.touches) {
        let touch = event.touches[0];
        return [touch.clientX - rect.left, touch.clientY - rect.top];
    } else {
        return [event.offsetX, event.offsetY];
    }
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", draw);

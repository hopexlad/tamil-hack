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
let lastX = 0, lastY = 0;
let lastTimestamp = 0;

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
    event.preventDefault();
    isDrawing = true;
    [lastX, lastY] = getCoordinates(event);
    lastTimestamp = event.timeStamp;
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing) return;
    event.preventDefault();

    let [x, y] = getCoordinates(event);
    let now = event.timeStamp;
    let timeDiff = now - lastTimestamp;

    ctx.lineWidth = Math.min(5 + timeDiff / 50, 8); // Dynamic width adjustment
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    // Midpoint interpolation for smoother drawing
    let midX = (lastX + x) / 2;
    let midY = (lastY + y) / 2;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.quadraticCurveTo(midX, midY, x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
    lastTimestamp = now;

    requestAnimationFrame(() => draw(event)); // Ensures smooth rendering
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

// Prevent scrolling while drawing
canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

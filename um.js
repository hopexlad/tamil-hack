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
    draw(event);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing) return;
    let x, y;
    if (event.touches) {
        let touch = event.touches[0];
        x = touch.clientX - canvas.getBoundingClientRect().left;
        y = touch.clientY - canvas.getBoundingClientRect().top;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", draw);


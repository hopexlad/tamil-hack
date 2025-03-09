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
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "black";
ctx.lineWidth = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let points = [];

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

// 🖋️ **Start Drawing**
function startDrawing(event) {
    event.preventDefault();
    isDrawing = true;
    points = [];
    const [x, y] = getCoordinates(event);
    points.push({ x, y });
}

// 🖋️ **Stop Drawing**
function stopDrawing() {
    isDrawing = false;
    points = [];
}

// 🖋️ **Smooth Draw Function**
function draw(event) {
    if (!isDrawing) return;
    event.preventDefault();
    
    const [x, y] = getCoordinates(event);
    points.push({ x, y });

    if (points.length < 3) {
        const point = points[0];
        ctx.beginPath();
        ctx.arc(point.x, point.y, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Remove previous frame (important for smoothing)
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Draw using Bezier curves for smooth strokes
    for (let i = 1; i < points.length - 2; i++) {
        let midX = (points[i].x + points[i + 1].x) / 2;
        let midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }

    ctx.stroke();
}

// **Get Cursor/Tap Position**
function getCoordinates(event) {
    let rect = canvas.getBoundingClientRect();
    if (event.touches) {
        let touch = event.touches[0];
        return [touch.clientX - rect.left, touch.clientY - rect.top];
    } else {
        return [event.offsetX, event.offsetY];
    }
}

// 🚀 **Event Listeners for Smooth Mobile Drawing**
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);

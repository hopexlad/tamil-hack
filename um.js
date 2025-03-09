const lessonsData = {
    uyir: [
        { tamil: "அ", transliteration: "a", audio: "audio/a.mp3" },
        { tamil: "ஆ", transliteration: "aa", audio: "audio/aa.mp3" },
        { tamil: "இ", transliteration: "i", audio: "audio/i.mp3" }
    ],
    mei: [
        { tamil: "க", transliteration: "ka", audio: "audio/ka.mp3" },
        { tamil: "ங", transliteration: "nga", audio: "audio/nga.mp3" },
        { tamil: "ச", transliteration: "cha", audio: "audio/cha.mp3" }
    ],
    words: [
        { tamil: "நன்றி", transliteration: "Nandri", audio: "audio/nandri.mp3" },
        { tamil: "வணக்கம்", transliteration: "Vanakkam", audio: "audio/vanakkam.mp3" }
    ],
    greetings: [
        { tamil: "காலை வணக்கம்", transliteration: "Kaalai Vanakkam", audio: "audio/kaalai.mp3" },
        { tamil: "மதிய வணக்கம்", transliteration: "Mathiya Vanakkam", audio: "audio/mathiya.mp3" }
    ]
};

let currentLessons = [];
let currentLesson = 0;

function loadLessons(type) {
    currentLessons = lessonsData[type];
    currentLesson = 0;

    document.getElementById("homePage").style.display = "none";
    document.getElementById("lessonPage").style.display = "block";

    document.getElementById("lessonTitle").textContent =
        type === "uyir" ? "UYIR YELUTHUKKAL" :
        type === "mei" ? "MEI YELUTHUKKAL" :
        type === "words" ? "SIMPLE WORDS" : "GREETINGS";

    document.getElementById("canvasContainer").style.display = (type === "uyir" || type === "mei") ? "block" : "none";
    
    updateLesson(type);
}

function updateLesson(type) {
    let content = document.getElementById("lessonContent");

    if (type === "uyir" || type === "mei") {
        content.innerHTML = `
            <div class="card">
                <h2 id="tamilCharacter">${currentLessons[currentLesson].tamil}</h2>
                <p id="transliteration">${currentLessons[currentLesson].transliteration}</p>
                <button onclick="playAudio()">🔊 Pronounce</button>
            </div>
        `;
        document.getElementById("audioPlayer").src = currentLessons[currentLesson].audio;
    } else {
        content.innerHTML = `
            <ul id="wordsList">
                ${currentLessons.map(item => `
                    <li>
                        <span class="word">${item.tamil} - ${item.transliteration}</span>
                        <button onclick="playAudio('${item.audio}')">🔊</button>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

function playAudio(audioSrc) {
    let audio = document.getElementById("audioPlayer");
    audio.src = audioSrc;
    audio.play();
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

function goHome() {
    document.getElementById("lessonPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
}

// Canvas Drawing
const canvas = document.getElementById("writingCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let isDrawing = false;

if (canvas) {
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchmove", draw);
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
    let x = event.offsetX || event.touches[0].clientX - canvas.getBoundingClientRect().left;
    let y = event.offsetY || event.touches[0].clientY - canvas.getBoundingClientRect().top;
    
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

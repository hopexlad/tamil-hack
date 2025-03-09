const uyirLessons = [
    { tamil: "அ", transliteration: "a", audio: "audio/a.mp3" },
    { tamil: "ஆ", transliteration: "aa", audio: "audio/aa.mp3" },
    { tamil: "இ", transliteration: "i", audio: "audio/i.mp3" }
];

const meiLessons = [
    { tamil: "க", transliteration: "ka", audio: "audio/ka.mp3" },
    { tamil: "ங", transliteration: "nga", audio: "audio/nga.mp3" },
    { tamil: "ச", transliteration: "cha", audio: "audio/cha.mp3" }
];

let currentLesson = 0;
let currentLessons = [];

const canvasContainer = document.getElementById("canvasContainer");
const canvas = document.getElementById("writingCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

function goToLessons(type) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("lessonPage").style.display = "block";

    if (type === 'uyir') {
        currentLessons = uyirLessons;
        document.getElementById("lessonTitle").textContent = "உயிர் எழுத்துக்கள்";
        document.getElementById("singleLesson").style.display = "block";
        document.getElementById("listLessons").style.display = "none";
        canvasContainer.style.display = "block"; // Show canvas
        currentLesson = 0;
        updateLesson();
    } else if (type === 'mei') {
        currentLessons = meiLessons;
        document.getElementById("lessonTitle").textContent = "மெய் எழுத்துக்கள்";
        document.getElementById("singleLesson").style.display = "block";
        document.getElementById("listLessons").style.display = "none";
        canvasContainer.style.display = "block"; // Show canvas
        currentLesson = 0;
        updateLesson();
    } else {
        document.getElementById("singleLesson").style.display = "none";
        document.getElementById("listLessons").style.display = "block";
        document.getElementById("wordsList").innerHTML = "";

        if (type === 'words') {
            document.getElementById("lessonTitle").textContent = "SIMPLE WORDS";
            addWordsToList(wordsLessons);
        } else if (type === 'greetings') {
            document.getElementById("lessonTitle").textContent = "GREETINGS";
            addWordsToList(greetingsLessons);
        }
    }
}

function goHome() {
    document.getElementById("lessonPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
}

function updateLesson() {
    document.getElementById("tamilCharacter").textContent = currentLessons[currentLesson].tamil;
    document.getElementById("transliteration").textContent = currentLessons[currentLesson].transliteration;
    document.getElementById("audioPlayer").src = currentLessons[currentLesson].audio;
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

// List View for Words & Greetings
function addWordsToList(lessonList) {
    let listContainer = document.getElementById("wordsList");
    listContainer.innerHTML = "";

    lessonList.forEach((lesson) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="word">${lesson.tamil} - ${lesson.transliteration}</span>
            <button onclick="playAudioFile('${lesson.audio}')">🔊 Pronounce</button>
        `;
        listContainer.appendChild(listItem);
    });
}

function playAudioFile(audioSrc) {
    let audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = audioSrc;
    audioPlayer.play();
}

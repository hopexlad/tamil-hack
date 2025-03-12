document.addEventListener("DOMContentLoaded", function () {
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

    function showPage(pageId) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("lessonPage").style.display = "none";
    document.getElementById("sentenceGamePage").style.display = "none"; // ✅ Hide sentence game too!

    document.getElementById(pageId).style.display = "block";

    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    if (pageId === "homePage") {
        document.querySelector(".nav-link:nth-child(1)").classList.add("active");
    } else if (pageId === "quizPage") {
        document.querySelector(".nav-link:nth-child(2)").classList.add("active");
    } else if (pageId === "sentenceGamePage") {
        document.querySelector(".nav-link:nth-child(3)").classList.add("active");
        loadSentenceGame(); // ✅ Load game only when needed
    }
}


    window.showPage = showPage;

    function goToLessons(type) {
        currentLessons = (type === "uyir") ? uyirLessons : maeiLessons;
        document.getElementById("lessonTitle").textContent =
            (type === "uyir") ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL";
        showPage("lessonPage");
        if (canvas) canvas.style.display = "block";
        currentLesson = 0;
        updateLesson();
    }

    function goHome() {
        showPage("homePage");
    }

    function updateLesson() {
        document.getElementById("tamilCharacter").textContent = currentLessons[currentLesson].tamil;
        document.getElementById("transliteration").textContent = currentLessons[currentLesson].transliteration;
        document.getElementById("audioPlayer").src = currentLessons[currentLesson].audio;
        document.getElementById("progressBar").style.width =
            ((currentLesson + 1) / currentLessons.length) * 100 + "%";

        document.getElementById("progressText").textContent = `${currentLesson + 1}/${currentLessons.length}`;
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

    const canvas = document.getElementById("writingCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function setCanvasSize() {
            canvas.width = canvas.clientWidth || 300;
            canvas.height = canvas.clientHeight || 300;
        }
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function startDrawing(event) {
            event.preventDefault();
            isDrawing = true;
            const { x, y } = getCoordinates(event);
            lastX = x;
            lastY = y;
        }

        function stopDrawing() {
            isDrawing = false;
        }

        function draw(event) {
            if (!isDrawing) return;
            event.preventDefault();

            const { x, y } = getCoordinates(event);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            lastX = x;
            lastY = y;
        }

        function getCoordinates(event) {
            let rect = canvas.getBoundingClientRect();
            let x, y;

            if (event.touches) {
                let touch = event.touches[0];
                x = touch.clientX - rect.left;
                y = touch.clientY - rect.top;
            } else {
                x = event.offsetX;
                y = event.offsetY;
            }
            return { x, y };
        }

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);

        canvas.addEventListener("touchstart", startDrawing, { passive: false });
        canvas.addEventListener("touchmove", draw, { passive: false });
        canvas.addEventListener("touchend", stopDrawing);
    }

    window.goToLessons = goToLessons;
    window.goHome = goHome;
    window.playAudio = playAudio;
    window.nextLesson = nextLesson;
    window.prevLesson = prevLesson;
    if (canvas) window.clearCanvas = clearCanvas;

    // ✅ Sentence Builder Game Integration
    const sentences = [
        { words: ["நான்", "புத்தகம்", "வாசிக்கிறேன்"], correct: "நான் புத்தகம் வாசிக்கிறேன்" },
        { words: ["அவன்", "வேகமாக", "ஓடினான்"], correct: "அவன் வேகமாக ஓடினான்" },
        { words: ["இது", "என்", "கணினி"], correct: "இது என் கணினி" }
    ];

    let currentSentenceIndex = 0;
    function loadSentenceGame() {
        const sentenceContainer = document.getElementById("sentenceContainer");
        const wordBank = document.getElementById("wordBank");
        const resultMessage = document.getElementById("resultMessage");

        sentenceContainer.innerHTML = "";
        wordBank.innerHTML = "";
        resultMessage.innerText = "";

        let words = [...sentences[currentSentenceIndex].words];
        words = words.sort(() => Math.random() - 0.5);

        words.forEach(word => {
            const wordElement = document.createElement("div");
            wordElement.classList.add("word");
            wordElement.innerText = word;
            wordElement.draggable = true;
            wordElement.addEventListener("dragstart", dragStart);
            wordBank.appendChild(wordElement);
        });

        sentenceContainer.addEventListener("dragover", dragOver);
        sentenceContainer.addEventListener("drop", drop);
    }

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.innerText);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const wordText = event.dataTransfer.getData("text");
        const draggedWord = document.createElement("div");
        draggedWord.classList.add("word");
        draggedWord.innerText = wordText;
        draggedWord.draggable = true;
        draggedWord.addEventListener("dragstart", dragStart);
        document.getElementById("sentenceContainer").appendChild(draggedWord);

        Array.from(document.getElementById("wordBank").children).forEach(word => {
            if (word.innerText === wordText) {
                word.remove();
            }
        });
    }

    window.loadSentenceGame = loadSentenceGame;
});

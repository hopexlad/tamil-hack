document.addEventListener("DOMContentLoaded", function () {
    const tamilLetters = ["அ", "ஆ", "இ", "உ", "எ", "ஏ", "ஒ", "ஓ", "ஃ", "க", "ச", "ட", "த", "ப", "ம", "ய", "ர", "ல"];
    const container = document.querySelector(".floating-letters-container");

    if (!container) {
        console.error("❌ ERROR: .floating-letters-container NOT FOUND!");
        return;
    }

    function createLetter() {
        const letter = document.createElement("div");
        letter.classList.add("tamil-letter");
        letter.innerText = tamilLetters[Math.floor(Math.random() * tamilLetters.length)];

        // Positioning: Start at the bottom with a random horizontal position
        letter.style.left = Math.random() * 100 + "vw";
        letter.style.bottom = "-10vh"; // Start below screen

        // Random font size between 1.5rem to 4rem
        letter.style.fontSize = `${Math.random() * 2.5 + 1.5}rem`;

        // Random opacity between 0.3 to 1
        letter.style.opacity = Math.random() * 0.7 + 0.3;

        // Random animation duration between 6s and 12s
        const animationDuration = Math.random() * 6 + 6 + "s";
        letter.style.animation = `floatUp ${animationDuration} linear forwards`;

        container.appendChild(letter);

        // Remove the letter after animation ends
        setTimeout(() => letter.remove(), parseFloat(animationDuration) * 1000);
    }

    // Generate Tamil letters every 300ms (adjust speed if needed)
    setInterval(createLetter, 300);
});

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
        document.querySelectorAll("#homePage, #quizPage, #lessonPage").forEach(page => page.style.display = "none");
        document.getElementById(pageId).style.display = "block";

        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        document.querySelector(`.nav-link[onclick="showPage('${pageId}')"]`)?.classList.add("active");
    }

    window.showPage = showPage;

    function goToLessons(type) {
        currentLessons = (type === "uyir") ? uyirLessons : maeiLessons;
        document.getElementById("lessonTitle").textContent = (type === "uyir") ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL";
        currentLesson = 0;
        showPage("lessonPage");
        updateLesson();
    }

    window.goToLessons = goToLessons;
    window.goHome = () => showPage("homePage");

    function updateLesson() {
        const lesson = currentLessons[currentLesson];
        document.getElementById("tamilCharacter").innerText = lesson.tamil;
        document.getElementById("transliteration").innerText = lesson.transliteration;
        document.getElementById("audioPlayer").src = lesson.audio;
        document.getElementById("progressBar").style.width = `${((currentLesson + 1) / currentLessons.length) * 100}%`;
        document.getElementById("progressText").innerText = `${currentLesson + 1}/${currentLessons.length}`;
        clearCanvas();
    }

    window.nextLesson = () => { if (currentLesson < currentLessons.length - 1) { currentLesson++; updateLesson(); } };
    window.prevLesson = () => { if (currentLesson > 0) { currentLesson--; updateLesson(); } };
    window.playAudio = () => document.getElementById("audioPlayer").play();

    const canvas = document.getElementById("writingCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const setCanvasSize = () => { canvas.width = 300; canvas.height = 300; };
        setCanvasSize();

        let drawing = false, lastX = 0, lastY = 0;

        const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.clearCanvas = clearCanvas;

        canvas.addEventListener("mousedown", (e) => { drawing = true; lastX = e.offsetX; lastY = e.offsetY; });
        canvas.addEventListener("mousemove", (e) => {
            if (!drawing) return;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            lastX = e.offsetX;
            lastY = e.offsetY;
        });
        canvas.addEventListener("mouseup", () => drawing = false);
        canvas.addEventListener("mouseout", () => drawing = false);
    }
});

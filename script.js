document.addEventListener("DOMContentLoaded", function () {
    const tamilLetters = ["அ", "ஆ", "இ", "உ", "எ", "ஏ", "ஒ", "ஓ", "ஃ", "க", "ச", "ட", "த", "ப", "ம", "ய", "ர", "ல"];
    const background = document.querySelector(".floating-background");

    function createLetter() {
        if (!background) return;

        const letter = document.createElement("div");
        letter.classList.add("tamil-letter");
        letter.innerText = tamilLetters[Math.floor(Math.random() * tamilLetters.length)];
        letter.style.left = Math.random() * 100 + "vw";
        letter.style.top = Math.random() * 100 + "vh";
        letter.style.fontSize = `${Math.random() * 3 + 1.5}rem`;
        letter.style.animationDuration = Math.random() * 15 + 10 + "s";

        background.appendChild(letter);

        setTimeout(() => {
            letter.style.opacity = "0";
            setTimeout(() => letter.remove(), 5000);
        }, parseFloat(letter.style.animationDuration) * 1000);
    }

    function createBlurBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add("blur-bubble");
        const size = Math.random() * 100 + 30;
        bubble.style.width = bubble.style.height = `${size}px`;
        bubble.style.left = Math.random() * 100 + "vw";
        bubble.style.top = Math.random() * 100 + "vh";
        bubble.style.animationDuration = Math.random() * 20 + 10 + "s";

        background.appendChild(bubble);
        setTimeout(() => bubble.remove(), parseFloat(bubble.style.animationDuration) * 1000);
    }

    setInterval(createLetter, 2000);
    setInterval(createBlurBubble, 3000);

    // ✅ LESSONS FUNCTIONALITY
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
        document.querySelectorAll(".page").forEach(page => page.style.display = "none");
        document.getElementById(pageId).style.display = "block";
        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        document.querySelector(`[data-page='${pageId}']`)?.classList.add("active");
    }

    window.goToLessons = function (type) {
        document.getElementById("lessonTitle").textContent = type === "uyir" ? "UYIR YELUTHUKKAL" : "MEI YELUTHUKKAL";
        showPage("lessonPage");
    };

    window.goHome = function () {
        showPage("homePage");
    };
});

    function goToLessons(type) {
        currentLessons = (type === "uyir") ? uyirLessons : maeiLessons;
        document.getElementById("lessonTitle").textContent =
            (type === "uyir") ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL";

        showPage("lessonPage");
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
            `${((currentLesson + 1) / currentLessons.length) * 100}%`;

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

    // ✅ FIX CANVAS ISSUES
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

        // ✅ ATTACH EVENT LISTENERS SAFELY
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);

        canvas.addEventListener("touchstart", startDrawing, { passive: false });
        canvas.addEventListener("touchmove", draw, { passive: false });
        canvas.addEventListener("touchend", stopDrawing);
    }

    // ✅ Ensure functions are globally accessible
    window.goToLessons = goToLessons;
    window.goHome = goHome;
    window.playAudio = playAudio;
    window.nextLesson = nextLesson;
    window.prevLesson = prevLesson;
    if (canvas) window.clearCanvas = clearCanvas;
});

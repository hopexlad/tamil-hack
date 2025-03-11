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

    const canvas = document.getElementById("writingCanvas");
    const ctx = canvas.getContext("2d");

    // ✅ Ensure canvas size is set properly after DOM loads
    function setCanvasSize() {
        canvas.width = canvas.clientWidth || 300; // Default width if clientWidth is 0
        canvas.height = canvas.clientHeight || 300; // Default height if clientHeight is 0
    }

    setCanvasSize(); // Set size initially
    window.addEventListener("resize", setCanvasSize); // Adjust on window resize

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
function showPage(pageId) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "none";
    document.getElementById(pageId).style.display = "block";
}

// Default to show "Learn Tamil" page
document.addEventListener("DOMContentLoaded", function () {
    showPage("homePage");
});

    function goToLessons(type) {
        currentLessons = type === "uyir" ? uyirLessons : maeiLessons;
        document.getElementById("lessonTitle").textContent =
            type === "uyir" ? "UYIR YELUTHUKKAL" : "MAEI YELUTHUKKAL";
        document.getElementById("homePage").style.display = "none";
        document.getElementById("lessonPage").style.display = "block";
        canvas.style.display = "block"; // ✅ Ensure the canvas is visible
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

    // ✅ Attach event listeners correctly
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);

    // ✅ Ensure functions are accessible globally
    window.goToLessons = goToLessons;
    window.goHome = goHome;
    window.playAudio = playAudio;
    window.nextLesson = nextLesson;
    window.prevLesson = prevLesson;
    window.clearCanvas = clearCanvas;
});

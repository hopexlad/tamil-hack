document.addEventListener("DOMContentLoaded", function () {
    const allQuestions = [
        { question: "What is the Tamil word for 'Tiger'?", options: ["புலி", "யானை", "நாய்", "மாடு"], correct: "புலி" },
        { question: "What is the Tamil word for 'Blue'?", options: ["சிவப்பு", "பச்சை", "நீலம்", "மஞ்சள்"], correct: "நீலம்" },
        { question: "What is the Tamil word for 'Sun'?", options: ["சந்திரன்", "சூரியன்", "நிலா", "திங்கள்"], correct: "சூரியன்" },
        { question: "What is the Tamil word for 'Water'?", options: ["நீர்", "காற்று", "அலை", "மழை"], correct: "நீர்" },
        { question: "What is the Tamil word for 'Apple'?", options: ["மாதுளம்", "செவ்வாழை", "ஆப்பிள்", "மாம்பழம்"], correct: "ஆப்பிள்" },
        { question: "What is the Tamil word for 'Elephant'?", options: ["நாய்", "பன்றி", "யானை", "முயல்"], correct: "யானை" },
        { question: "What is the Tamil word for 'Star'?", options: ["மின்", "நட்சத்திரம்", "சூரியன்", "பூமி"], correct: "நட்சத்திரம்" },
        { question: "What is the Tamil word for 'Rain'?", options: ["நீர்", "மழை", "காற்று", "அலை"], correct: "மழை" },
        { question: "What is the Tamil word for 'Fish'?", options: ["மீன்", "நாய்", "பன்றி", "யானை"], correct: "மீன்" },
        { question: "What is the Tamil word for 'Red'?", options: ["பச்சை", "சிவப்பு", "நீலம்", "மஞ்சள்"], correct: "சிவப்பு" }
    ];

    let selectedQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function getRandomQuestions() {
        let shuffled = allQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10); // Pick 10 random questions
    }

    function loadQuestion() {
        if (currentQuestionIndex >= 10) {
            showResults();
            return;
        }

        const questionContainer = document.getElementById("questionText");
        const optionsContainer = document.getElementById("optionsContainer");
        const progressText = document.getElementById("progressText");

        let currentQuestion = selectedQuestions[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;
        progressText.innerText = `${currentQuestionIndex + 1}/10`; // Progress display

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = function () { checkAnswer(button, option, currentQuestion.correct); };
            optionsContainer.appendChild(button);
        });

        document.getElementById("nextBtn").disabled = true; // Disable Next button initially
    }

    function checkAnswer(button, selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            button.style.backgroundColor = "green"; // ✅ Correct Answer
            score++;
        } else {
            button.style.backgroundColor = "red"; // ❌ Wrong Answer
        }

        // Disable all buttons after answering
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.innerText === correctAnswer) {
                btn.style.backgroundColor = "green"; // Show the correct answer
            }
        });

        document.getElementById("nextBtn").disabled = false; // Enable Next button
    }

    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResults() {
        const quizPage = document.getElementById("quizPage");
        quizPage.innerHTML = `<h1>Quiz Completed!</h1>
                              <h2>Your Score: ${score}/10</h2>
                              <p>${getFeedbackMessage(score)}</p>
                              <button onclick="location.reload()">Play Again</button>
                              <button onclick="window.location.href='index.html'">Home</button>`;
    }

    function getFeedbackMessage(score) {
        if (score >= 8) return "🎉 Excellent! You're great at Tamil words!";
        if (score >= 5) return "😊 Good job! Keep practicing.";
        return "😐 Keep improving! Try again.";
    }

    document.getElementById("nextBtn").addEventListener("click", nextQuestion);

    selectedQuestions = getRandomQuestions(); // Pick 10 random questions
    loadQuestion();
});

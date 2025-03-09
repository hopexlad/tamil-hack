document.addEventListener("DOMContentLoaded", function () {
    const quizData = [
        { 
            question: "What is the Tamil word for 'Tiger'?", 
            options: ["புலி", "யானை", "நாய்", "மாடு"], 
            correct: "புலி"
        },
        { 
            question: "What is the Tamil word for 'Blue'?", 
            options: ["சிவப்பு", "பச்சை", "நீலம்", "மஞ்சள்"], 
            correct: "நீலம்"
        }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const questionContainer = document.getElementById("questionText");
        const optionsContainer = document.getElementById("optionsContainer");

        const currentQuestion = quizData[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = function () { checkAnswer(button, option, currentQuestion.correct); };
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(button, selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            button.style.backgroundColor = "green"; // ✅ Correct Answer
        } else {
            button.style.backgroundColor = "red"; // ❌ Wrong Answer
        }

        // Disable all buttons after answering
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.innerText === correctAnswer) {
                btn.style.backgroundColor = "green"; // Always show the correct one in green
            }
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            alert("Quiz Completed!");
            window.location.href = "index.html";
        }
    }

    loadQuestion(); // Load first question on page load
});

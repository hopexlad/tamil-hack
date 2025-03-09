document.addEventListener("DOMContentLoaded", function () {
    const quizData = [
        {
            question: "What is the Tamil word for 'Tiger'?",
            choices: ["யானை", "புலி", "காகம்", "நண்டு"],
            answer: "புலி"
        },
        {
            question: "How do you say 'Good Morning' in Tamil?",
            choices: ["நன்றி", "வணக்கம்", "காலை வணக்கம்", "இரவு வணக்கம்"],
            answer: "காலை வணக்கம்"
        },
        {
            question: "Which of these is a Fruit?",
            choices: ["மாம்பழம்", "யானை", "கேரட்", "நண்டு"],
            answer: "மாம்பழம்"
        },
        {
            question: "Which of these is a Bird?",
            choices: ["சிட்டுக்குருவி", "நண்டு", "புலி", "வாழைப்பழம்"],
            answer: "சிட்டுக்குருவி"
        },
        {
            question: "Which color represents 'Sivappu'?",
            choices: ["🔴", "🟢", "🔵", "⚫"],
            answer: "🔴"
        }
    ];

    function loadQuiz() {
        const quizContainer = document.getElementById("quizContainer");
        quizContainer.innerHTML = ""; // Clear previous content

        const randomQuestion = quizData[Math.floor(Math.random() * quizData.length)];

        const questionElement = document.createElement("h2");
        questionElement.innerText = randomQuestion.question;

        quizContainer.appendChild(questionElement);

        randomQuestion.choices.forEach(choice => {
            const choiceButton = document.createElement("button");
            choiceButton.innerText = choice;
            choiceButton.onclick = () => checkAnswer(choice, randomQuestion.answer);
            quizContainer.appendChild(choiceButton);
        });
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            alert("✅ Correct!");
        } else {
            alert("❌ Wrong! The correct answer is: " + correct);
        }
        loadQuiz(); // Load next question
    }

    loadQuiz(); // Load first quiz question
});

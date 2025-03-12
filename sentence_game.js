document.addEventListener("DOMContentLoaded", function () {
    const sentences = [
        { words: ["நான்", "புத்தகம்", "வாசிக்கிறேன்"], correct: "நான் புத்தகம் வாசிக்கிறேன்" },
        { words: ["அவன்", "வேகமாக", "ஓடினான்"], correct: "அவன் வேகமாக ஓடினான்" },
        { words: ["இது", "என்", "கணினி"], correct: "இது என் கணினி" }
    ];

    let currentSentenceIndex = 0;

    const sentenceContainer = document.getElementById("sentenceContainer");
    const wordBank = document.getElementById("wordBank");
    const checkBtn = document.getElementById("checkBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resultMessage = document.getElementById("resultMessage");

    function loadSentence() {
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
        sentenceContainer.appendChild(draggedWord);

        // Remove from word bank
        const words = Array.from(wordBank.children);
        words.forEach(word => {
            if (word.innerText === wordText) {
                word.remove();
            }
        });
    }

    checkBtn.addEventListener("click", function () {
        const formedSentence = Array.from(sentenceContainer.children).map(word => word.innerText).join(" ");
        if (formedSentence === sentences[currentSentenceIndex].correct) {
            resultMessage.innerText = "✅ Correct!";
            resultMessage.style.color = "green";
        } else {
            resultMessage.innerText = "❌ Try Again!";
            resultMessage.style.color = "red";
        }
    });

    nextBtn.addEventListener("click", function () {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        loadSentence();
    });

    loadSentence();
});

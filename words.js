document.addEventListener("DOMContentLoaded", function () {
    const wordsData = {
        simple: [
            { tamil: "நன்றி", transliteration: "Nanri", english: "Thank you", audio: "audio/nanri.mp3" },
            { tamil: "வணக்கம்", transliteration: "Vanakkam", english: "Hello", audio: "audio/vanakkam.mp3" },
            { tamil: "ஆமாம்", transliteration: "Aam", english: "Yes", audio: "audio/aam.mp3" },
            { tamil: "இல்லை", transliteration: "Illai", english: "No", audio: "audio/illai.mp3" }
        ],
        greetings: [
            { tamil: "காலை வணக்கம்", transliteration: "Kaalai Vanakkam", english: "Good Morning", audio: "audio/kaalai_vanakkam.mp3" },
            { tamil: "மதிய வணக்கம்", transliteration: "Madhiyam Vanakkam", english: "Good Afternoon", audio: "audio/madhiyam_vanakkam.mp3" },
            { tamil: "மாலை வணக்கம்", transliteration: "Maalai Vanakkam", english: "Good Evening", audio: "audio/maalai_vanakkam.mp3" },
            { tamil: "இரவு வணக்கம்", transliteration: "Iravu Vanakkam", english: "Good Night", audio: "audio/iravu_vanakkam.mp3" }
        ]
    };

    window.loadWords = function (type) {
        const container = document.getElementById("wordContainer");
        container.innerHTML = ""; // Clear previous content

        wordsData[type].forEach(word => {
            const wordDiv = document.createElement("div");
            wordDiv.innerHTML = `
                <p><strong>${word.tamil}</strong> (${word.transliteration}) - <em>${word.english}</em></p>
                <button onclick="playAudio('${word.audio}')">🔊 Pronounce</button>
            `;
            container.appendChild(wordDiv);
        });
    };

    window.playAudio = function (audioSrc) {
        new Audio(audioSrc).play();
    };
});

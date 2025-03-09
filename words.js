document.addEventListener("DOMContentLoaded", function () {
    const wordsData = {
        simple: [
            { tamil: "நன்றி", transliteration: "Nanri", english: "Thank you", audio: "audio/nanri.mp3" },
            { tamil: "வணக்கம்", transliteration: "Vanakkam", english: "Hello", audio: "audio/vanakkam.mp3" }
        ],
        greetings: [
            { tamil: "காலை வணக்கம்", transliteration: "Kaalai Vanakkam", english: "Good Morning", audio: "audio/kaalai_vanakkam.mp3" }
        ],
        numbers: [
            { tamil: "ஒன்று", transliteration: "Ondru", english: "One", audio: "audio/one.mp3" },
            { tamil: "இரண்டு", transliteration: "Irandu", english: "Two", audio: "audio/two.mp3" }
        ],
        animals: [
            { tamil: "புலி", transliteration: "Puli", english: "Tiger", audio: "audio/tiger.mp3" },
            { tamil: "யானை", transliteration: "Yaanai", english: "Elephant", audio: "audio/elephant.mp3" }
        ],
        birds: [
            { tamil: "காகம்", transliteration: "Kaagam", english: "Crow", audio: "audio/crow.mp3" },
            { tamil: "சிட்டுக்குருவி", transliteration: "Chittukuruvi", english: "Sparrow", audio: "audio/sparrow.mp3" }
        ],
        colours: [
            { tamil: "சிவப்பு", transliteration: "Sivappu", english: "Red", audio: "audio/red.mp3" },
            { tamil: "நீலம்", transliteration: "Neelam", english: "Blue", audio: "audio/blue.mp3" }
        ],
        fruits: [
            { tamil: "மாம்பழம்", transliteration: "Maampazham", english: "Mango", audio: "audio/mango.mp3" },
            { tamil: "வாழைப்பழம்", transliteration: "Vazhaipazham", english: "Banana", audio: "audio/banana.mp3" }
        ],
        vegetables: [
            { tamil: "கேரட்", transliteration: "Kaarot", english: "Carrot", audio: "audio/carrot.mp3" },
            { tamil: "பீட்ரூட்", transliteration: "Beetrooot", english: "Beetroot", audio: "audio/beetroot.mp3" }
        ],
        tastes: [
            { tamil: "இனிப்பு", transliteration: "Inippu", english: "Sweet", audio: "audio/sweet.mp3" },
            { tamil: "காரம்", transliteration: "Kaaram", english: "Spicy", audio: "audio/spicy.mp3" }
        ]
    };

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function loadWords(type) {
        const container = document.getElementById("wordContainer");
        const categoryTitle = document.getElementById("categoryTitle");

        if (!wordsData[type]) {
            categoryTitle.innerText = "Category Not Found";
            return;
        }

        const categoryNames = {
            simple: "Simple Words",
            greetings: "Greetings",
            numbers: "Numbers",
            animals: "Animals",
            birds: "Birds",
            colours: "Colours",
            fruits: "Fruits",
            vegetables: "Vegetables",
            tastes: "Tastes"
        };

        categoryTitle.innerText = categoryNames[type] || "Category";
        container.innerHTML = ""; // Clear previous content

        wordsData[type].forEach(word => {
            const wordDiv = document.createElement("div");
            wordDiv.classList.add("word-box");
            wordDiv.innerHTML = `
                <p><strong>${word.tamil}</strong> (${word.transliteration}) - <em>${word.english}</em></p>
                <button class="audio-btn" onclick="playAudio('${word.audio}')">🔊</button>
            `;
            container.appendChild(wordDiv);
        });
    }

    window.playAudio = function (audioSrc) {
        new Audio(audioSrc).play();
    };

    // Load words based on URL parameter
    const category = getQueryParam("category");
    if (category) loadWords(category);
});

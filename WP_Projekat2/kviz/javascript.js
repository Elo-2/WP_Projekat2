const questions = [
    {
        question: "Koji je programski jezik najčešće povezan sa razvojem web stranica?",
        answers: [
            "HTML",
            "JavaScript",
            "SQL",
            "Python"
        ],
        correct: 1
    },
    {
        question: "Šta znači HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Technology Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Koji jezik se koristi za stilizovanje web stranica?",
        answers: [
            "JavaScript",
            "HTML",
            "CSS",
            "PHP"
        ],
        correct: 2
    },
    {
        question: "Koji element HTML-a se koristi za najveći naslov?",
        answers: [
            "<p>",
            "<h1>",
            "<title>",
            "<header>"
        ],
        correct: 1
    },
    {
        question: "Koji jezik omogućava interaktivnost na web stranici?",
        answers: [
            "CSS",
            "HTML",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },
    {
        question: "Šta CSS prvenstveno određuje?",
        answers: [
            "Izgled web stranice",
            "Podatke u bazi",
            "Server",
            "E-mail adresu"
        ],
        correct: 0
    },
    {
        question: "Koja ekstenzija se koristi za JavaScript fajlove?",
        answers: [
            ".html",
            ".css",
            ".java",
            ".js"
        ],
        correct: 3
    },
    {
        question: "Koja naredba u JavaScriptu prikazuje poruku?",
        answers: [
            "print()",
            "alert()",
            "message()",
            "show()"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");

const restartBtn = document.getElementById("restartBtn");
const emailBtn = document.getElementById("emailBtn");


// Prikaži pitanje
function showQuestion() {

    selectedAnswer = null;

    const question = questions[currentQuestion];

    questionElement.textContent =
        (currentQuestion + 1) + ". " + question.question;

    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", () => {

            selectedAnswer = index;

            document
                .querySelectorAll(".answer-btn")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");
        });

        answersElement.appendChild(button);
    });

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Završi kviz"
            : "Sljedeće pitanje";
}


// Sljedeće pitanje
nextBtn.addEventListener("click", () => {

    if (selectedAnswer === null) {
        alert("Odaberite jedan odgovor.");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});


// Prikaži rezultat
function showResult() {

    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        "Vaš rezultat: " + score + " / " + questions.length;

    const oldBestScore =
        Number(localStorage.getItem("quizBestScore")) || 0;

    if (score > oldBestScore) {

        localStorage.setItem("quizBestScore", score);

        bestScoreElement.textContent =
            "Novi najbolji rezultat! 🏆";

    } else {

        bestScoreElement.textContent =
            "Najbolji rezultat: " +
            oldBestScore +
            " / " +
            questions.length;
    }
}


// Ponovni pokušaj
restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    showQuestion();
});


// Pošalji rezultat mailom
emailBtn.addEventListener("click", () => {

    const email = prompt("Unesite e-mail adresu:");

    if (!email) {
        return;
    }

    const subject = encodeURIComponent("Rezultat IPI kviza");

    const body = encodeURIComponent(
        "Pozdrav,\n\n" +
        "Moj rezultat na IPI kvizu je " +
        score +
        " / " +
        questions.length +
        ".\n\n" +
        "Lijep pozdrav!"
    );

    window.location.href =
        "mailto:" +
        email +
        "?subject=" +
        subject +
        "&body=" +
        body;
});


// Pokreni kviz
showQuestion();
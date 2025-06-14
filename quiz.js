
const questions = [
    {
        question: "Siapa nama pacar kamu?",
        type: "text",
        validate: (answer) => answer.trim().toLowerCase() === "gregorius gilang threesulistianto"
    },
    {
        question: "Tanggal lahir pacarmu kapan?",
        type: "text",
        validate: (answer) => answer.trim().toLowerCase() === "13 mei 1998"
    },
    {
        question: "Kenapa kamu memilih Gilang sebagai pacarmu?",
        type: "textarea",
        validate: (answer) => answer.trim() !== ""
    },
    {
        question: "Apakah kamu mencintai Gilang sebagai mas mu?",
        type: "multiple",
        options: ["Yaa", "Yaaaaaaaa", "YAAAA!!!!"],
        validate: () => true
    },
    {
        question: "Apakah kamu siap setelah ini?",
        type: "multiple",
        options: ["Ya", "Tidak"],
        validate: () => true
    }
];

let currentQuestion = 0;
let retryReady = false;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const sound = document.getElementById("sound");
const transitionMusic = document.getElementById("transitionMusic");

function loadQuestion() {
    answerEl.innerHTML = "";
    if (currentQuestion === 2) {
        document.body.style.background = "#fff3f3";
        setTimeout(() => {
            questionEl.innerText = "🎉 You Almost There!!! 🎉";
        }, 200);
        setTimeout(() => {
            sound.play();
            showQuestionContent();
        }, 3000);
    } else {
        showQuestionContent();
    }
}

function showQuestionContent() {
    const q = questions[currentQuestion];
    questionEl.innerText = q.question;
    if (q.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "userInput";
        answerEl.appendChild(input);
        const btn = document.createElement("button");
        btn.innerText = "Next";
        btn.onclick = validateAnswer;
        answerEl.appendChild(btn);
    } else if (q.type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.id = "userInput";
        textarea.rows = 4;
        textarea.cols = 40;
        answerEl.appendChild(textarea);
        const btn = document.createElement("button");
        btn.innerText = "Next";
        btn.onclick = validateAnswer;
        answerEl.appendChild(btn);
    } else if (q.type === "multiple") {
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.innerText = opt;
            btn.onclick = () => {
                if (currentQuestion === 4) {
                    if (opt === "Tidak") {
                        retryReady = true;
                        validateAnswer(opt);
                    } else {
                        playTransitionMusic(); // Play music if Ya is selected
                    }
                } else {
                    validateAnswer(opt);
                }
            };
            answerEl.appendChild(btn);
        });
    }
}

function validateAnswer(selectedOption = null) {
    const q = questions[currentQuestion];
    let userAnswer = selectedOption;

    if (q.type === "text" || q.type === "textarea") {
        userAnswer = document.getElementById("userInput").value;
    }

    if (q.validate(userAnswer)) {
        if (currentQuestion === 4) {
            if (retryReady) {
                questions[4].options = ["Ya", "YA"];
                retryReady = false;
                loadQuestion();
                return;
            }
        }
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            window.location.href = "birthday.html";
        } else {
            loadQuestion();
        }
    } else {
        alert("Jawaban kamu masih salah nih, coba lagi yaa 💕");
    }
}

function playTransitionMusic(){
    transitionMusic.play();
    setTimeout(() => {
        currentQuestion++;
        window.location.href = "birthday.html";
    }, 2000); // delay biar musik keburu mulai
}

loadQuestion();

const question = [
    {
        question: "Which is the most famous place in Lahore?",
        answer: [
            {text: "Shahi Qila", correct: true},
            {text: "Jhangir Maqbara", correct: false},
            {text: "Lahore Museum", correct: false},
            {text: "Food Street", correct: false}
        ]
    },
    {
        question: "Who am I to you?",
        answer: [
            {text: "Brother", correct: true},
            {text: "Father", correct: false},
            {text: "Son", correct: false},
            {text: "Husband", correct: false}
        ]
    },
    {
        question: "my Bithday?",
        answer: [
            {text: "20 Sep", correct: false},
            {text: "23 Sep", correct: true},
            {text: "28 Sep", correct: false},
            {text: "25 Sep", correct: false}
        ]
    }
    
];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-btns");
const nextBtn = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQues = question[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQues.question;

    currentQues.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button); 

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswers);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswers(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    } );
    nextBtn.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuesIndex++;
    if(currentQuesIndex < question.length) {
        showQuestion();
    }else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuesIndex < question.length){
        handleNextBtn();
    }else {
        startQuiz();
    }
})


startQuiz();
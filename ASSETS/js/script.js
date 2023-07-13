const questions = [
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers: [
            { text: "is in", correct: false},
            { text: "in", correct: true},
            { text: "exists", correct: false},
            { text: "lies", correct: false},
        ]
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: [
            { text: "const", correct: true},
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "constant", correct: false},
        ]
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "both A and B", correct: true},
            { text: "none of the above", correct: false},
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            { text: "getElementbyId()", correct: false},
            { text: "Both A and C", correct: true},
            { text: "getElementsByClassName()", correct: false},
            { text: "None of the above", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startPage = document.querySelector(".instructions");

 
var quizEl = document.querySelector("#quiz");
var questionEl = document.getElementById("question");
var choiceEL = Array.from(document.getElementsByClassName("choice"));
var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");
var scoreEl = document.getElementById("finalscores");


var currentQuery = {};

var allQuestions = [
    {
        question: "What type of data is enclosed in quotation marks?", 
        choice1: "Number",
        choice2: "Boolean",
        choice3: "String",
        choice4: "BigInt",
        answer: 3,   
    },
    {
        question: "Which of the following is a primitive datatype?", 
        choice1: "String", 
        choice2: "Boolean", 
        choice3: "Number",
        choice4:  "All of the above",
        answer: 4,        
    },
    {
        question: "What type of data is a boolean?", 
        choice1: "String", 
        choice2: "True/False",
        choice3:  "Key/Value",
        choice4:  "Variables",
        answer: 2,        
    },
    {
        question: "What type of data is enclosed in brackets and seperated by commas?", 
        choice1: "Object", 
        choice2: "Array", 
        choice3: "BigInt",
        choice4:  "Variables",
        answer: 2,        
    },
    {
        question: "What property would you use to determine the how many items are in a string?", 
        choice1: "While loop",
        choice2:  "&&", 
        choice3: ".push", 
        choice4: ".length",
        answer: 4,        
    },
    {
        question: "What is a function inside of an object called?", 
        choice1: "Function", 
        choice2: "Varibable", 
        choice3: "Method", 
        choice4: "Nested Function",
        answer: 3,        
    },
    {
        question: "Which of the following would call the function 'startGame'?", 
        choice1: "startGame()", 
        choice2: "init: startGame", 
        choice3: "startGame", 
        choice4: "function startGame()",
        answer: 1,        
    },
    {
        question: "What selector would you use to change all <p> elements?", 
        choice1: ".setAttribute", 
        choice2: ".selectElement", 
        choice3: ".createElement", 
        choice4: ".querySelectorAll",
        answer: 4,        
    },
    {
        question: "How can you target an element's attribute with JavaScript?", 
        choices1: ".target", 
        choice2: ".setAttribute", 
        choice3: ".removeAttribute", 
        choice4: ".getAttribute",
        answer: 4,        
    },
    {
        question: "Which arthmetic operator returns the remainder of two numbers?", 
        choice1: "*", 
        choice2: "/", 
        choice3: "%", 
        choice4: "||",
        answer: 3,        
    },
]

var questionsLeft = [];
 
var questionIndex = 0;

var score = 0;


var finish = document.querySelector("#finish")
var timerWon = document.querySelector("#uh-oh");
var congrats = document.querySelector("#congrats");
var initialsInput = document.getElementById('initials');
var submitBtn = document.getElementById("submitscore");
var goToScores = document.getElementById("scoreslist");
var goHome = document.querySelector('#goHome');

 
var timer;
var timerCount;



function startQuiz() {
    timerCount = 120;
    
    qIndex = 0;
    score = 0;
    startTimer();
    startPage.style.display="none";
    quizEl.style.display="flex";
    
    questionsLeft = [...allQuestions];
    renderNextQuestion();
}


function startTimer() {
  
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;

    
    if (timerCount <= 0) {
     
      clearInterval(timer);
     
      timedOut();
    }
  }, 1000);
}
function renderNextQuestion() {
    correctEl.style.display="none";
    wrongEl.style.display="none";
    var questioncCounter = Math.floor(Math.random() * questionsLeft.length);
    if (questionsLeft.length === 0) {
       return youWon(); 
    }
    if (timerCount === 0) {
        return timedOut();
    }
    questionIndex++;
    currentQuery = questionsLeft[questioncCounter];
    questionEl.innerText = currentQuery.question;
    choiceEL.forEach(choiceEL => {
        var number = choiceEL.dataset['number'];
        choiceEL.innerText = currentQuery['choice' + number];
    });
    questionsLeft.splice(questioncCounter, 1);
}
choiceEL.forEach(choiceEL => {
    choiceEL.addEventListener('click', query => {
        var userChoice = query.target;
        var userAnswer = userChoice.dataset["number"];
        if (userAnswer == currentQuery.answer) {
            correctEl.style.display="flex";
            
            score += 10
        }
        if (userAnswer != currentQuery.answer) {
            wrongEl.style.display="flex";
            
            timerCount -=
        setTimeout(renderNextQuestion, 1500);
        
    });
})

function setScore() {
    score.textContent = scoreEl
    localStorage.setItem("scoreCount", score);
}

function showScores() {
    var storedScore = localStorage.getItem("scoreCount");
    if (storedScore === null) {
      scoreCounter = 0;
    } else {
      score = storedScore;
    }
    scoreEl.textContent = score;
}

function saveScore() {
    var userInitials = initialsInput.value;
    if (initialsInput !== '') {
        var savedHighScores = JSON.parse(window.localStorage.getItem('savedHighScores')) || [];
        var latestScore = {score: score, initials: userInitials};
        savedHighScores.push(latestScore);
        window.localStorage.setItem('savedHighScores', JSON.stringify(savedHighScores));
        
        return homePage();
    }
}


function youWon() {
    quizEl.style.display="none";
    timerWon.style.display="none";
    finish.style.display="flex"
    congrats.style.display="flex";
    scoreEl.textContent = score;
    
    clearInterval(timer);
    goHome.addEventListener('click', homePage);
}

function timedOut() {
    quizEl.style.display="none";
    finish.style.display="flex";
    congrats.style.display="none";
    timerWon.style.display="flex";
    scoreEl.textContent = score;
    goHome.addEventListener('click', homePage);
}

function homePage() {
    startPage.style.display="flex";
    finish.style.display="none"
    quizEl.style.display="none";
    timerWon.style.display="none";
    congrats.style.display="none";
}
submitBtn.addEventListener("click", saveScore);
startButton.addEventListener("click", startQuiz);
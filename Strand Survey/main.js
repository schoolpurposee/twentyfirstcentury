
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4')
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('css', `${option1Total}`);
    option2.setAttribute('css', `${option2Total}`);
    option3.setAttribute('css', `${option3Total}`);
    option4.setAttribute('css', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('css'));
    score.push(answerScore);
    selectedAnswersData.push();
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally it incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then it hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        let programming = 0;
        let css = 0;
        for(let i = 0; i < score.length; i++) {
            if(i % 2 === 0) {
                css += score[i];
            } else {
                programming += score[i];
            }
        }
        result.innerHTML =
         `
         <div class="summary">
            <h1>Summary</h1>
            <p>Your compatability with : CSS(${css}/15), Programming(${programming}/15) <br> Possible - See below for a summary based on your results:</p>
            <p> 11 - 15   You are gonna be able to do well </p>
            <p>7 - 10 - You are going to be fine</p>
            <p>6 - 4 - You will struggle</p>
            <p>3 and below - bawal ka dito boss lipat kana strand</p>
        </div>
        <button class="restart">Restart Survey</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
let questions = [
    {
        question:"console.log(`javascript`)",
        answers:[
            {text:"Javascript",correct:false},
            {text:"javascript",correct:true},
            {text:"javaScript",correct:false},
            {text:"JAVASCRIPT",correct:false},
        ]
    },
    {
        question:`let number = 92 
        console.log(number)`,
        answers:[
            {text:"75",correct:false},
            {text:"49",correct:false},
            {text:"54",correct:false},
            {text:"92",correct:true},
        ]
    }
    
    
];
let questionelement = document.getElementById("question");
let answerbutton = document.getElementById("answerbuttons");
let nextele = document.getElementById("next-btn");
let currentquestion = 0;
let score = 0;
function startquiz() {
        currentquestion = 0;
        score = 0;
        nextele.innerHTML = "Next";
        showquestion();
}
function showquestion(){
    resetstate ();
    let currentques = questions[currentquestion]
    let questionNo = currentquestion + 1;
    questionelement.innerHTML = questionNo+". "+currentques.question;

    currentques.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetstate() {
    nextele.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectanswer(e) {
    let selectbtn = e.target;
    let iscorrect = selectbtn.dataset.correct === "true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else {
        selectbtn.classList.add("incorrect");

    }
    Array.from(answerbutton.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextele.style.display = "block";
}
function showscore() {
    resetstate();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextele.innerHTML = "Play Again";
    nextele.style.display = "block";
}
function handlenextbutton() {
    currentquestion++;
    if(currentquestion<questions.length){
        showquestion();
    }
    else {
        showscore();
    }
}
nextele.addEventListener("click",() => {
    if(currentquestion < questions.length){
        handlenextbutton();
    }
    else {
        startquiz();
    }
})
startquiz();

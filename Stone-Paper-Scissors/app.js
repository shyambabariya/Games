let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let user = document.querySelector("#user");
let comp = document.querySelector("#comp");
let draw = document.querySelector("#draw");

let userScore = 0;
let compScore = 0;
let drawGame = 0;

let options = ["rock", "paper", "scissors"];

for (let choice of choices) {
  choice.addEventListener("click", () => {
    let userChoice = choice.getAttribute("id");
    gamePlay(userChoice);
  });
}

const compChoice = () => {
  let randIdx = Math.floor(Math.random() * 3);
  let randChoice = options[randIdx];
  return randChoice;
};

const gameDraw = () => {
  msg.innerText = `Game is Draw no one is winner`;
  msg.style.backgroundColor = "grey";
  drawGame++;
  draw.innerText = `${drawGame}`;
};
const gamePlay = (userChoice) => {
  console.log("userchoice", userChoice);
  let compChoices = compChoice();
  console.log("compchoice", compChoices);
  if (userChoice === compChoices) {
    gameDraw();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoices === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoices === "scissors" ? false : true;
    } else {
      userWin = compChoices === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoices);
  }
};

function showWinner(userWin, userChoice, compChoices) {
  if (userWin) {
    msg.innerText = `Congratualtions User is Winner
    Your ${userChoice} beats ${compChoices}`;
    msg.style.backgroundColor = "green";
    userScore++;
    user.innerText = `${userScore}`;
  } else {
    msg.innerText = `Bad choice,Computer is Winner
    ${compChoices} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    compScore++;
    comp.innerText = `${compScore}`;
  }
}

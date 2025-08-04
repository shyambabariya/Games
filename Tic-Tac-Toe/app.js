let body = document.querySelector("body");
let btns = document.querySelectorAll(".box");
let h2 = document.querySelector("#start");
let msgCon = document.querySelector(".msgContainer");
let winnerText = document.querySelector("#winText");
let newGameBtn = document.querySelector("#newGame");
let h3 = document.querySelector("h3");
let main = document.querySelector("main");
let resetGameBtn = document.querySelector("#reset");

let started = false;
let turnO = true;
let count = 0;
let highScore = [];

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBtn = () => {
  for (btn of btns) {
    btn.disabled = true;
  }
};

const enableBtn = () => {
  for (btn of btns) {
    btn.disabled = false;
    btn.innerText = "";
  }
};
disableBtn();
body.addEventListener("keypress", () => {
  if (started == false) {
    enableBtn();
    h2.innerText = `Game Started`;
    started = true;
  }
});

const resetGame = () => {
  turnO = true;
  enableBtn();
  started = false;
  msgCon.classList.add("hide");
  main.classList.remove("hide");
};

for (let btn of btns) {
  btn.addEventListener("click", () => {
    if (turnO) {
      btn.innerText = "O";
      turnO = false;
    } else {
      btn.innerText = "X";
      turnO = true;
    }
    checkWinner();
    btn.disabled = true;
  });
}

function highestScore(num){
  highScore.push(num);
  let idx = 0;
  for(let i = 0; i < highScore.length;i++){
    let max = highScore[idx];
    if(highScore[i] > max){
      idx = i;
    }
  }
  h3.innerText = `Your Current highest Score is ${highScore[idx]}`;
}

function showWinner(winner){
    winnerText.innerText = `Congratulations!, Winner is ${winner}`;
    msgCon.classList.remove("hide");
    main.classList.add("hide");
}

function checkWinner() {
  for (let winpattern of winningPatterns) {
    let pos1 = btns[winpattern[0]].innerText;
    let pos2 = btns[winpattern[1]].innerText;
    let pos3 = btns[winpattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        disableBtn();
        count++;
        highestScore(count);
        winnerText.innerText = `Congratulations!, Winner is ${pos1}, 
            if you want to play again then press on New Game`;
        msgCon.classList.remove("hide");
        main.classList.add("hide");
        // showWinner(pos1);
      }
    }
  }
}

resetGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

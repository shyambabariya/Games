let body = document.querySelector("body");
let nameCon = document.querySelector(".name-container");
let player1 = document.querySelector(".player1");
// let player2 = document.querySelector(".player2");
let startGame = document.querySelector("#startGame");
let btns = document.querySelectorAll(".box");
let heading = document.querySelector("#heading");
let msgCon = document.querySelector(".msg-container");
let winnerText = document.querySelector("#winText");
let newGameBtn = document.querySelector("#newGame");
let h3 = document.querySelector("h3");
let main = document.querySelector("main");
let resetGameBtn = document.querySelector("#reset");

let started = false;
let userMove = true;
let level = 0;
let count = 0;
let totalDraw = 0;
let highScore = [];

let boxes = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let game = [];

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

// main.classList.add("hide");

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
// disableBtn();
body.addEventListener("keypress", () => {
  if (started == false) {
    startGame.addEventListener("click", () => {
      main.classList.remove("hides");
      nameCon.classList.add("hide");
    });
    heading.innerText = `Game Started`;
    started = true;
  }
});

const resetGame = () => {
  userMove = true;
  enableBtn();
  started = false;
  count = 0;
  msgCon.classList.add("hide");
  main.classList.remove("hide");
  boxes = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  game = [];
};
setTimeout(resetGame, 500);

function compMove() {
  // let winingCount = 0;
  const randIdx = Math.floor(Math.random() * boxes.length);
  const randBox = boxes[randIdx];
  const randBtn = document.querySelector(`#${randBox}`);
  randBtn.innerText = "X";
  randBtn.disabled = true;
  boxes.splice(randIdx, 1);
  game.push(randBtn.innerText);
  console.log(game);
  count++;
  userMove = true;
  if (count === 9 && !checkWinner()) {
    gameDraw();
  }
  checkWinner();
  console.log(boxes);
  // console.log(game);
  // disableBtn();
  // winingCount++;
  // h3.innerText = `Your Current highest Score of ${randBtn.innerText} is ${winingCount}`;
}

for (let btn of btns) {
  btn.addEventListener("click", () => {
    if (userMove) {
      let nam = player1.value;
      let btox = btn.getAttribute("id");
      console.log(btox);
      let idx = boxes.indexOf(btox);
      console.log(idx);
      if (idx > -1) {
        boxes.splice(idx, 1);
      }
      // let thing = boxes.splice(btox,1);
      // console.log(thing);
      btn.innerText = "O";
      console.log(boxes);
      count++;
      userMove = false;
      game.push(btn.innerText);
      console.log(game);

      checkWinner(nam);
      // level++;
      // checkWinner();
      if (count < 9 && !checkWinner()) {
        setTimeout(compMove, 500);
      }
      if (count === 9 && !checkWinner()) {
        gameDraw();
      }
    }
  });
}

function gameDraw() {
  winnerText.innerText = `Opps!, The Game is Draw,
    if you want to play again then press on New Game`;
  totalDraw++;
  h3.innerText = `Your Total Draw Game is ${totalDraw}`;
  msgCon.classList.remove("hide");
  main.classList.add("hide");
  disableBtn();
}

// function highestScore(num) {
//   highScore.push(num);
//   let idx = 0;
//   for (let i = 0; i < highScore.length; i++) {
//     let max = highScore[idx];
//     if (highScore[i] > max) {
//       idx = i;
//     }
//   }
//   h3.innerText = `Your Current highest Score is ${highScore[idx]}`;
// }

// function showWinner(winner){
//     winnerText.innerText = `Congratulations!, Winner is ${winner}`;
//     msgCon.classList.remove("hide");
//     main.classList.add("hide");
// }

function checkWinner(nam) {
  // for(let i = 0; i < game.length; i++){
  //   // if(game[i].innerText);
  //   console.log(game[i].innerText)
  // }
  for (let winpattern of winningPatterns) {
    let pos1 = btns[winpattern[0]].innerText;
    let pos2 = btns[winpattern[1]].innerText;
    let pos3 = btns[winpattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        disableBtn();
        // level++;
        // highestScore(level);
        // if(nam != player1.value){
        //   winnerText.innerText = `ohh Sorry!, Winner is Computer,
        //    if you want to play again then press on New Game`;
        // }
        // else{
        //   winnerText.innerText = `Congratulations!, Winner is ${nam},
        //       if you want to play again then press on New Game`;
        // }
        winnerText.innerText = `Winner is ${pos1},
           if you want to play again then press on New Game`;
           h3.innerText = `Your total playing games is ${level}`;
        msgCon.classList.remove("hide");
        main.classList.add("hide");
        // showWinner(pos1);
        
      }
    }
  }
}

resetGameBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

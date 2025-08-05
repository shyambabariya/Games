let body = document.querySelector("body");
let nameCon = document.querySelector(".name-container");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
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
let turnO = true;
let level = 0;
let count = 0;
let totalDraw = 0;
let highScore = [];

let boxes = ["one", "two", "three", "four", "five","six","seven","eight","nine"];
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
      console.log(player1.value);
      console.log(player2.value);
      main.classList.remove("hide");
      nameCon.classList.add("hide");
    });
    heading.innerText = `Game Started`;
    started = true;
  }
});

const resetGame = () => {
  turnO = true;
  enableBtn();
  started = false;
  count = 0;
  msgCon.classList.add("hide");
  main.classList.remove("hide");
};

// function comp(){
//   const randIdx = Math.floor(Math.random()*boxes.length);
//   const randBox = boxes[randIdx];
//   const randBtn = document.querySelector(`#${randBox}`);
//   game.push(randBox);
//   randBtn.innerText = "X";
//   randBtn.disabled = true;
//   boxes.splice(randIdx, 1);

//   count++;
//   turnO = true;

//   if (count === 9 && !checkWinner()) {
//         gameDraw();
//       }
//       checkWinner();
//   // console.log(boxes);
//   console.log(game);

//   // turnO = true;
//   // disableBtn();
// }

for (let btn of btns) {
  btn.addEventListener("click", () => {
    if (turnO) {
      console.log("btn click")
      let btox = btn.getAttribute("id");
      console.log(btox);
      let thing = boxes.splice(btox,1);
      console.log(thing);
      // game.push(thing);
      // console.log(game);
      btn.innerText = "O";
      btn.disabled = true;
      // console.log(boxes);
      
      count++;
      turnO = false;

      checkWinner();
    if(count < 9 && !checkWinner())  {
      setTimeout(comp, 500);
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

function highestScore(num) {
  highScore.push(num);
  let idx = 0;
  for (let i = 0; i < highScore.length; i++) {
    let max = highScore[idx];
    if (highScore[i] > max) {
      idx = i;
    }
  }
  h3.innerText = `Your Current highest Score is ${highScore[idx]}`;
}

// function showWinner(winner){
//     winnerText.innerText = `Congratulations!, Winner is ${winner}`;
//     msgCon.classList.remove("hide");
//     main.classList.add("hide");
// }

function checkWinner() {
  for (let winpattern of winningPatterns) {
    let pos1 = btns[winpattern[0]].innerText;
    let pos2 = btns[winpattern[1]].innerText;
    let pos3 = btns[winpattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        disableBtn();
        level++;
        highestScore(level);
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



// function user(btn){
//   // btn = this;
//   console.log(this);
//   // boxes.splice(this, 1);
//   // btn.innerText = "O";
// }
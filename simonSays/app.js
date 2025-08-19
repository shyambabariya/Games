let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let allbtns = document.querySelectorAll(".btn");
let h3 = document.querySelector("h3");

let started = false;
let level = 0;
let btns = ["red", "green", "yellow", "blue"];
let gameSeq = [];
let userSeq = [];
let highScore = [];

body.addEventListener("keypress", () => {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let idx = Math.floor(Math.random() * 4);
  let randColor = btns[idx];
  let randBox = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log("GameSeq is ", gameSeq);
  colorFlash(randBox);
}

let colorFlash = (btn) => {
  if (!started) return;
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
};

function userClick() {
    if(!started)return;
  let btn = this;
  colorFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log("UserSeq is ", userSeq);
  checkAns(userSeq.length - 1);
}

for (let btn of allbtns) {
  btn.addEventListener("click", userClick);
}

function highestScore() {
  let idx = 0;
  for (let i = 0; i < highScore.length; i++) {
    let maxScore = highScore[idx];
    if (maxScore < highScore[i]) {
      idx = i;
    }
  }
  h3.innerText = `Your High Score is ${highScore[idx]}`;
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (!started) return;
    body.classList.add("red");
    setTimeout(() => {
      body.classList.remove("red");
    }, 250);
    h2.innerText = `Opps Game Over Your Level is ${level}
    press any key to start`;
    highScore.push(level);
    highestScore();
    reset();
  }
}
function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
}

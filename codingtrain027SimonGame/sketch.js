// functions: strictMode(), initialize(), start(), beginInterval(), lightenUp(), beepIn(), darkDown(), stopLight()
// buttonClicked(), buttonUp(), compare(), gameOver()


let computerArr;
let playerArr;
let myLightFunc; // lights up button upon click
let myDarkFunc; // re-darkens button after a second
let light; // which button to light up
let i; // iterator through the playerArr
let active = true; // if true, computer sequence is active and player cannot press buttons

let c; // count

let buttons = document.querySelectorAll(".button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mousedown", buttonClicked, false);
  buttons[i].addEventListener("mouseup", buttonUp, false);
}

let reset = document.getElementById("reset");
reset.addEventListener("click", initialize, false);

let strict = document.getElementById("strict");
strict.addEventListener("click", strictMode, false);  // change button background color when true
let s = false; // strict mode

let context = new AudioContext();

let audioblue = context.createOscillator();
let b = context.createGain();
b.gain.value = 0;
audioblue.frequency.value = 329.63;
audioblue.type = "sine";
audioblue.connect(b);
b.connect(context.destination);
audioblue.start();

let audiored = context.createOscillator();
let r = context.createGain();
r.gain.value = 0;
audiored.frequency.value = 261.63;
audiored.type = "sine";
audiored.connect(r);
r.connect(context.destination);
audiored.start();

let audiogreen = context.createOscillator();
let g = context.createGain();
g.gain.value = 0;
audiogreen.frequency.value = 220;
audiogreen.type = "sine";
audiogreen.connect(g);
g.connect(context.destination);
audiogreen.start();

let audioyell = context.createOscillator();
let y = context.createGain();
y.gain.value = 0;
audioyell.frequency.value = 164.81;
audioyell.type = "sine";
audioyell.connect(y);
y.connect(context.destination);
audioyell.start();

function strictMode() {
  s = !s;
  if (s) {
    document.getElementById("strict").style.cssText = "background-color: red";
  }

  else {
     document.getElementById("strict").style.cssText = "background-color: yellow";
  }
}

function initialize() {
  stopLight(); // if light sequence is running, clear it (if start is pressed in middle of computer sequence)
  computerArr = [];
  playerArr = [];
  c = 0; // count
  i = 0; // iterator through playerArr
  start();
}

function start() {
  let rand = Math.floor(Math.random() * 4);
  computerArr.push(rand);
  let count = document.getElementById("count");
  c++;
  count.innerHTML = c;
  console.log(computerArr);
  beginInterval();
}

function beginInterval() {
  i = 0;
  let interval = 1800;
  if (c > 12) { // increase speed as count increases
    interval = 1050;
  }

  else if (c > 8) {
    interval = 1200;
  }

  else if (c > 5) {
    interval = 1500;
  }

  active = true; // computerArr sequence is beginning
  myLightFunc = setInterval(function() {lightUp(computerArr);}, interval);

}

// handle all beeps and light ups
// called during computerArr sequence and on user click
function beepIn(q) { // takes a string
	let elem = document.getElementById(q);
  switch(q) {
    case "zero":
      b.gain.setTargetAtTime(1, context.currentTime, 0.015);
      $(elem).css("background-color","#1c8cff");
      return 0;  // for user click, returns int to add to playerArr
      break;

    case "one":
      r.gain.setTargetAtTime(1, context.currentTime, 0.015);
			$(elem).css("background-color","#ff4c4c");
      return 1;
      break;

    case "two":
      g.gain.setTargetAtTime(1, context.currentTime, 0.015);
			$(elem).css("background-color","#13ff7c");
      return 2;
      break;

    case "three":
      y.gain.setTargetAtTime(1, context.currentTime, 0.015);
			$(elem).css("background-color","#fed93f");
      return 3;
      break;
  }
}


function lightUp(arr) {
  let quad;
	switch(arr[i]) {
    case 0:
      quad = "zero";
			beepIn(quad); // handles the beep and light up
      break;

    case 1:
      quad = "one";
      beepIn(quad);
      break;

    case 2:
      quad = "two";
      beepIn(quad);
      break;

    case 3:
      quad = "three";
      beepIn(quad);
      break;
  }

  myDarkFunc = setInterval(function() {darkDown(quad);}, 1000);
  i++;
  if (i == computerArr.length) {
    active = false; // computerArr is finished
    stopLight(myLightFunc);
  }
}

function darkDown(btn) { // takes a string
  let elem = document.getElementById(btn);
  if (btn == "zero") {
    b.gain.setTargetAtTime(0, context.currentTime, 0.015)
    $(elem).css("background-color","#023991");
  }
  else if (btn == "one") {
    r.gain.setTargetAtTime(0, context.currentTime, 0.015);
    $(elem).css("background-color","#910202");
  }
  else if (btn == "two") {
    g.gain.setTargetAtTime(0, context.currentTime, 0.015);
    $(elem).css("background-color","#008e02");
  }
  else if (btn == "three") {
    y.gain.setTargetAtTime(0, context.currentTime, 0.015);
    $(elem).css("background-color","#ccc000");
  }
  clearInterval(myDarkFunc); // clears interval started each time through lightUp
}

function stopLight() {
  clearInterval(myLightFunc);
}

function buttonClicked(square) {
  if (!active) { // only allow button clicks when computer sequence is inactive
    let pushed = square.target.id;
		let numb = beepIn(pushed); // handle beep and light up, returns numb

    playerArr.push(numb);

    console.log(playerArr);

    let x = compare(); // returns true or false
    if (x && playerArr.length == computerArr.length) { // if correct array, clear playerArr and pick new number for computerArr
      playerArr = []
      start();
    }
    if (!x && s) { // if wrong answer and in strict mode, you lose
      gameOver();
    }

    else if (!x && !s) { // if wrong answer, and not in strict mode, redo interval
      console.log("Try again")
      playerArr = [];
      stopLight(myLightFunc);
      beginInterval();
    }
  } // if playerArr len is not yet == to computerArr len, no code is executed, program simply waits for another button to be pushed by user
}

function buttonUp(square) {
  let pushed = square.target.id;
	darkDown(pushed); // end beep and re-darken button
}

function compare() {
  let i = playerArr.length - 1; // check most recent entry
    if (playerArr[i] != computerArr[i]) {
      return false;
    }
  else {
    return true;
  }
}

function gameOver() {
  computerArr = [];
  playerArr = [];
  active = true; // prevents further player clicks
  console.log("You lose");
}

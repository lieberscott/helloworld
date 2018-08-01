let session; // session Timer object instance
let btimer; // break Timer object instance

let s_min; // prevents s_timer display from jumping straight to session.min upon +/-
let s_timer; // reference to session timer HTML display
let s_increase; // reference to session + button
let s_decrease; // reference to session - button

// same variables as above for break timer
let b_min;
let b_timer;
let b_increase;
let b_decrease;

let buttonhtml; // reference to the big button HTML
let button; // reference to the entire button surface area


$(document).ready(function() {
  s_min = 20; // default minute value for session
  s_decrease = $("#sdecrease"); // session -
  s_timer = $("#stimer"); // session HTML
  s_increase = $("#sincrease"); // session +
  b_min = 5; // default minute value for break
  b_decrease = $("#bdecrease"); // break -
  b_timer = $("#btimer"); // break HTML
  b_increase = $("#bincrease"); // break +

  button = $("#button");
  buttonhtml = $("#buttonhtml");

  session = new Timer(s_min, buttonhtml, "Session");
  btimer = new Timer(b_min, buttonhtml, "Break");

  // increase session minutes
  $(s_increase).on("click", function() {
    if (session.off) { // only adjust session time on pause or when btimer is running
      s_min++;
      session.min = s_min;
      session.minsSet = s_min;
      session.sec = 0;

      s_timer.html(s_min);
    }
  });

  // decrease session minutes
  $(s_decrease).on("click", function() {
    if (session.off) {
      if (s_min > 1) {
        s_min--;
        session.min = s_min;
        session.minsSet = s_min;
      }
      session.sec = 0;

      s_timer.html(s_min);
    }
  });

  // increase break minutes
  $(b_increase).on("click", function() {
    if (btimer.off) {
      b_min++;
      btimer.min = b_min;
      btimer.minsSet = b_min;
      btimer.sec = 0;

      b_timer.html(b_min);
    }
  });

  // decrease break minutes
  $(b_decrease).on("click", function() {
    if (btimer.off) {
      if (b_min > 1) {
        b_min--;
        btimer.min = b_min;
        btimer.minsSet = b_min;
      }
      btimer.sec = 0;

      b_timer.html(b_min);
    }
  });

  // begin/pause session timer by clicking on the main button
  $(button).on("click", function() {
    if (btimer.active) { // var active ensures correct timer is restarted upon pause
      if (!btimer.off) { // if btimer is running, pause it
        btimer.stopClock(session.intervalFunction)
      }
      else if (btimer.off) { // if btimer is paused, restart it
        btimer.time();
      }
    }
    else if (session.off && btimer.off) { // first click of button, launch session
      session.time();
    }
    else if (!session.off) { // if session is running, pause it
      session.stopClock(session.intervalFunction);
    }
  });
});


class Timer {
  constructor(min, mainhtml, type) {
    this.min = min; // minutes
    this.minsSet = min; // minutes again, this will be used to reset the timer
    this.sec = 0;
    this.off = true; // boolean saying whether timer is off or not
    this.active = false; // used for pause/restart quality assurance so each timer must finish before the other starts
    this.disp = mainhtml; // big button HTML
    this.func;
    this.type = type; // "session" or "btimer"
  }

  time() { // function fired when the timer is clicked
    this.off = false;
    this.active = true;
    this.intervalFunc();
    // }
  }

  intervalFunc() { // set the interval of the timer
    let this2 = this;
    this.func = setInterval(function() {this2.countdown();}, 1000);
  }

  countdown() { // interval to complete for duration of timer
    // check if clock reaches zero
    // if clock is not at 0:00, display new time
    let m = this.min.toString();
    let s;
    if (this.sec < 10) {
      s = "0" + this.sec.toString()
    }
    else {
      s = this.sec.toString();
    }
    this.disp.html(this.type + "<br/> " + m + ":" + s);

    this.sec--;

    if (this.sec < 0) {
      this.min--;
      this.sec = 59;
      if (this.min < 0) {
        this.min = this.minsSet;
        this.sec = 0;
        this.off = true;
        this.active = false;
        if (this.type == "Session") {
          btimer.time();
        }
        else {
          session.time();
        }
        this.stopClock(this.func); // clearInterval() function below
      }
    }
  }

  stopClock() {
    this.off = true;
    clearInterval(this.func);
  }
}

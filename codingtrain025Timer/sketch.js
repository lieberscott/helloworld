// let counter = 0;
let timeleft = 100;

let startTime = 0;
let currentTime = 0;

function convertSeconds(s) {
	let min = floor(s/60);
	let sec = s % 60;
	return nf(min, 2) + ":" + nf(sec, 2);
}

function setup() {
	noCanvas();
	startTime = millis();
  //
	// let params = getURLParams();
  //
	// let min = params.minute;
	// timeleft = min * 60;

	let timer = select("#timer");
	timer.html(convertSeconds(timeleft - currentTime));

	let interval = setInterval(timeIt, 1000);

	function timeIt() {
		currentTime = floor((millis() - startTime) / 1000);
		timer.html(convertSeconds(timeleft - currentTime));
		if (currentTime == timeleft) {
			clearInterval(interval);
			counter = 0;
		}
	}
}

// setInterval to make API call every 5 seconds

let api = "http://api.open-notify.org/iss-now.json";
let dataReturn;

let issX;
let issY;

function setup() {
	createCanvas(600, 600);
	// loadJSON is a p5 function
	setInterval(askISS, 3000); // (callback, every ___ milliseconds);
	loadJSON(api, gotData, 'jsonp'); // may need to include 'jsonp' as a third argument if you get an XMLHTTP error
}

function askISS() {
	loadJSON(api, gotData); // may need to include 'jsonp' as a third argument if you get an XMLHTTP error
}

function gotData(data) {
	console.log(data);
	// dataReturn = data;
	let lat = float(data.iss_position.latitude);
	let long = float(data.iss_position.longitude);
	issX = map(lat, -90, 90, 0, width);
	issY = map(long, -90, 90, 0, height);
}

function draw() {
	background(51);

	// if (dataReturn) { // if the API call has finished and returned the data
	// use if you want to load data from an API call but need to make sure it's been retrieved before you execute draw()
		fill(255);
		ellipse(issX, issY, 16, 16);
	// }

}

// "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=dc9382b3e30cf004cda143a69ae560a4"

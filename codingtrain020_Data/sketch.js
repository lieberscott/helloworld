// Take input from user to make API call

let api = "https://api.openweathermap.org/data/2.5/weather?q=";
let city;
let input;
let apiKey = "&APPID=dc9382b3e30cf004cda143a69ae560a4";
let units = "&units=imperial";
let dataReturn;

function setup() {
	createCanvas(windowWidth, windowHeight);

	let button = select("#submit");
	button.mousePressed(getWeather); // callback function getWeather()
	city = select("#city");
}

function getWeather(data) {
	input = city.value(); // user input city name
	let url = api + input + units + apiKey;
	loadJSON(url, gotData); // (API address, callBackfunction for when data arrives, 'json') --> optional third argument ('json') when you get "XMLHTTP Request Cannot Load"
}

function gotData(data) {
	dataReturn = data;
}

function draw() {

	if (dataReturn) { // if the API call has finished and returned the data
		// do something
	}

}

// "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=dc9382b3e30cf004cda143a69ae560a4"

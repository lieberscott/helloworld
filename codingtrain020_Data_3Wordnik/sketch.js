// Wordnik API
// developer.wordnik.com

let url = "http://api.wordnik.com/v4/word.json/";
let word = "rainbow";
let url2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

let link;
function setup() {
	link = createA("#", word);
	link.mousePressed(askWordnik);
}

function askWordnik() {
	loadJSON(url + word + url2, gotData);
}

function gotData(data) {
	let len1 = data.length;
	let ran1 = floor(random(len1));
	let len2 = data[ran1].words.length;
	let ran2 = floor(random(len2));
	word = data[ran1].words[ran2];
	link.html(word);
	// console.log(data);
}

function draw() {

}

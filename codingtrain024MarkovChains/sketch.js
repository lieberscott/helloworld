// Markov chains

// let txt;
// function preLoad() {
//   txt = loadStrings("text.txt");
// 	console.log(txt);
// }

let txt = "this rainbow has rain things and a bowtie before this evening it went even with a unicorn flying over it."
let order = 3;
let ngrams = {};
let button;

function setup() {
  noCanvas();

	for (let i = 0; i < txt.length - order; i++) {
		let gram = txt.substring(i, i + order);

		if (!ngrams[gram]) {
			ngrams[gram] = [];
		}
		ngrams[gram].push(txt.charAt(i + order));
	}
	button = createButton("generate");
	button.mousePressed(markovIt);
	// console.log(ngrams);

}

function markovIt() {

	let currentGram = txt.substring(0, order);
	let result = currentGram; // currentGram will be appended with a single char

	for (let i = 0; i < 30; i++) {
		let possibilities = ngrams[currentGram];
		if (!possibilities) {
			break;
		}
		let next = random(possibilities);
		result += next; // append randomly selected single char to currentGram
		currentGram = result.substring(result.length - order, result.length);
  }

	createP(result);
}

// NYT API
// http://developer.nytimes.com/

let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b26b35709e284f1aad81b915a888b4e3&q=rainbow&page=0";

function setup() {
  loadJSON(url, gotData);
}

function gotData(data) {
	let headline1 = data.response.docs[4].headline.print_headline;
	console.log(headline1);
}

function draw() {

}

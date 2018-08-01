// Giphy API
// api.giphy.com

let url = "http://api.giphy.com/v1/gifs/search?q=";
let query = "funny+cats"
let url2 = "&api_key="
let apikey = "iL5AbvF6DpKvondRUbkJgoauCrMvFojF"; // beta-testing key
let url3 = "&limit=5";

let gif;


function setup() {
  let call = url + query + url2 + apikey + url3;
  loadJSON(call, gotData);
}

function gotData(data) {
	// let headline1 = data.response.docs[4].headline.print_headline;
	gif = data.data[0].images.original.url;
  createImg(gif);
}

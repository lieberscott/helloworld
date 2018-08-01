// 9 functions: getPrevWeek(), getNextWeek(), getRandDate(), formatDate()
// doSearch(), gotData(), replacer(), getMatch(), getKeyByValue()

let nameEquivalents = {
  "Obama": "Trump",
  "OBAMA": "TRUMP",
  "Barack": "Donald",
  "H.": "J.",
  "Democrats": "G.O.P.",
  "Democrats": "GOP",
  "Democrat": "Republican",
  "Democrats": "Republicans",
  "Michelle": "Melania",
  "Sasha": "Ivanka",
  "Malia": "Eric",
  "Obamacare": "Trumpcare"
}; // bugs: ["'-( , G.O.P., OBAMA, Democrat (perfect grammar)

let regex;

let apiKey; // NYT API key
let fq; // NYT API search parameter
let d; // day
let m; // month
let y; // year
let begDate; // NYT API search parameter
let date = new Date(2017, 0, 21); // Trump inauguration day 2017
let earliest = new Date(2007, 09, 01); // earliest date allowed is Oct. 1, 2007
let latest = new Date(); // latest date allowed is today's date
let sort; // NYT API search parameter
let fl; // NYT API search parameter
let url; // NYT API url constructed from above items
let resultsDate;

// let regex2 = /["'-]/;



function setup() {
  noCanvas();

  let previous = select("#previous");
  previous.mouseClicked(getPrevWeek);

  let next = select("#next");
  next.mouseClicked(getNextWeek);

  let rand = select("#rand");
  rand.mouseClicked(getRandDate);

  begDate = "20170121"; // Trump inauguration day 2017
  resultsDate = select("#resultsDate");

  doSearch();
}

function formatDate(date) {
  d = date.getDate().toString();
  m = nf(date.getMonth() + 1); // nf is a p5 method to convert number to string, + 1 because in the Date() JS object, months are zero-indexed
  y = date.getFullYear().toString();
  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }
  return y + m + d;
}

function getPrevWeek() {
  if (date > earliest) {
    date.setDate(date.getDate() - 7);
  }
  begDate = formatDate(date);

  doSearch();
}

function getNextWeek() {
  if (date < latest) {
    date.setDate(date.getDate() + 7);
  }
  begDate = formatDate(date);

  doSearch();
}

function getRandDate() { // code from: https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
  date = new Date(earliest.getTime() + Math.random() * (latest.getTime() - earliest.getTime()));
  begDate = formatDate(date);

  doSearch();
}

function doSearch() {

    apiKey = "b26b35709e284f1aad81b915a888b4e3";
    fq = "headline:(Trump Obama)"; // filtered query (only searching headlines)
    // begDate = begDate // defined in setup(), getPrevWeek(), getNextWeek(), or getRandDate()
    sort = "oldest";
    fl = "headline,snippet,pub_date,web_url"; // return info
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&fq=" + fq + "&begin_date=" + begDate + "&sort=" + sort + "&fl=" + fl;

    regex = /(?: ?\b[A-Z](?:[a-zA-Z]+\b|\.))+/g; // (?: -> non-capturing group

    loadJSON(url, gotData);
}

function replacer(match) {
  let matches = match.split(" ");
  matches = matches.filter(String); // filter by (return true if) item is a String (deletes the "" items in the array)

  return matches.map(checkMatch).join("");
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function checkMatch(m, index, arr){
  if(nameEquivalents.hasOwnProperty(m)) {
    return " " + nameEquivalents[m];
  }
  else {
    let v = getKeyByValue(nameEquivalents, m);
    if(v) {
      return " " + v;
    }
  }
  return " " + m;
}


function gotData(data) {
  let response = data.response.docs;
  let headline = "";
  let link = "";
  let snippet = "";
  let resultHTML = "";
  let pubdate = response[0].pub_date;
  let year = pubdate.slice(0, 4);
  let mon = pubdate.slice(5, 7); // NYT API has months 1-indexed, unlike Javascript new Date() object which is 0-indexed
  let day = pubdate.slice(8, 10);

  switch(mon) {
    default:
      mon = mon;
      break;
    case "01":
      mon = "January";
      break;
    case "02":
      mon = "February";
      break;
    case "03":
      mon = "March";
      break;
    case "04":
      mon = "April";
      break;
    case "05":
      mon = "May";
      break;
    case "06":
      mon = "June";
      break;
    case "07":
      mon = "July";
      break;
    case "08":
      mon = "August";
      break;
    case "09":
      mon = "September";
      break;
    case "10":
      mon = "October";
      break;
    case "11":
      mon = "November";
      break;
    case "12":
      mon = "December";
      break;
  }

  let resultsWeek = '<span id="date">' + mon + " " + day + ", " + year + '</span>'; // #date gets some CSS
  let innerHTML = "<h5>Headlines from the week of " + resultsWeek + "</h5>";
  resultsDate.html(innerHTML); // resultsDate = select("#resultsDate") from setup()

  for (let i = 0; i < response.length; i++) {
    link = response[i].web_url;
    headline = '<h2><a href="' + link + '" target="_blank">' + response[i].headline.main + "</a></h2>";
    snippet = '<div class="bodycopy">' + response[i].snippet + "</div>";
    headline = headline.replace(regex, replacer);
    snippet = snippet.replace(regex, replacer);
    resultHTML = headline + snippet;
    let paraID = select("#result" + i);
    paraID.html(resultHTML);
  }
}

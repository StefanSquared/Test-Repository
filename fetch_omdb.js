const fetch = require("node-fetch");
const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const baseUrl = 'https://www.omdbapi.com/?apikey=bd4924dc';
let searchResults;

rl.question("Enter the movie you want to search for:", (movie) => {
    console.log("You entered the following search term: " + movie);
    search(movie);
  });

function search(movie){
  fetch(baseUrl + '&s=' + movie)
  .then(res => res.json())
  .then(json => {
    //console.log(res);
    searchResults = json;
    console.log("Found " + json.Search.length + " results:");
    json.Search.forEach((item, i) => {
      console.log(i + ": " + item.Title);
    });
    rl.question("Select which movie you want to look up: ", (number) => {
      console.log(json.Search[number]);
      getDetails(json.Search[number].imdbID);
    })
  });
}

function getDetails(id)
{
  fetch(baseUrl + '&i=' + id)
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
}

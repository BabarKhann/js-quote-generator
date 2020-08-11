const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();

    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "Unknown";
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (err) {
    getQuote();
    console.log(`sorryyy, no quote --- ${err}`);
  }
} // getQuote();

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuote.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuote();

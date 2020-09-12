const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {

    showLoading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        quoteText.innerText = data.quoteText;
        authorText.innerText = data.quoteAuthor;
                
    } catch (error) {
        quoteText.innerText = "Be faithful in small things because it is in them that your strength lies.";
        authorText.innerText = "Mother Teresa";
    }

    hideLoading();
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//add evert listener 
twitterBtn.addEventListener("click",tweetQuote)
newQuoteBtn.addEventListener("click",getQuote);

// on load
getQuote();
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Get Quote From API
async function getQuote(){
    loading();
    const proxyUrl = "https://agile-escarpment-78340.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyUrl + apiUrl );
        const data = await response.json();
        if(data.quoteAuthor === ''){  // If author is not known and empty string bug
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if(quoteText.innerText.length > 120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }

        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
        complete();
    } 
    // Stop loader and show the quote 
    
    
    catch(error){
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners 

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// Loading function

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// On Load
getQuote();

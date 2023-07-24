const projectName = 'random-quote-machine';
let quotesData;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const changeButton = document.querySelector('button')
const body = document.querySelector('body')
const button = document.querySelector('button')
const img = document.querySelector('.img')
const tweet = document.querySelector('#tweet-quote')
const tumblr = document.querySelector('#tumblr-quote')

changeButton.addEventListener('click', e => {
  let color = getRandomHexColor();
    body.style.backgroundColor = color;
    body.style.color = color;
    button.style.backgroundColor = color;
    img.style.fill = color;
    tweet.style.backgroundColor = color;
    tumblr.style.backgroundColor = color;
})

let currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
      },
    url:
      'https://gist.githubusercontent.com/Murlykin/845c893eb7dab0aea8342b8002a11da4/raw/d486b9b3b86e7029f964aa995a60406e8ca5741d/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
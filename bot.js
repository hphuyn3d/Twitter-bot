// Prints this out to let users know that bot.js is connected
console.log('Bot is starting');

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var request = require('request');

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me tell reply with a thanks
stream.on('follow', followed);

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + ' thanks for the follow!');
}

// Tweet function
function tweetIt(txt) {
  T.post('statuses/update', {
    status: txt
  }, function (err, data, response) {
    if (err) {
      console.log("Something went wrong");
    } else {
      console.log("Yaz it worked");
    }
  });
}

  var getQuoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en&key=457653";
  function getQuote (callback) {
	request(getQuoteURL, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body);
	  callback(body); 
	});
  }

  
  function postTweet(tweet) {
	console.log(tweet);
	T.post('statuses/update', { status: tweet }, function(err, data, response) {
	});
}

// Tweets random quote every two hours
setInterval(function(){
    getQuote(postTweet);
    console.log("tweeted")
}, 2000*60*60);
  

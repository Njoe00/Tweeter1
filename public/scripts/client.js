
$(document).ready(function() {

  // takes in tweeter data objects and as 
  const renderTweets = function (tweets) {
    //reverses tweets object array order

    let reversedTweets = tweets.reverse();
    //iterates over it calls createTweetElement
    for (let key in reversedTweets) {

      // calls createTweetElement as acallback function to attach key pair values from object
      const $tweet = createTweetElement(reversedTweets[key]);

      // apends html template to tweets-container in index.html 
      $('#tweets-container').append($tweet);     
    }
  
  };
  
  // access user objects from renderTweets and accesses speific key:pair values and adds them to html template and returns back to renderTweets
  const createTweetElement = (tweetData) => {

    const userTweets = `<article class="article">
      <header class="article-tweet-header">
        <div class="article-tweet-header-profile">
          <div class="tweet-header-icon">
            <img src= ${tweetData.user.avatars}">
          </div>  
          <p>${tweetData.user.name}</p>
        </div>
        <div class="tweet-handle">${tweetData.user.handle}</div>
        </header>
        <p class="tweet-text">${tweetData.content.text}</p>
      <footer class="article-tweet-footer">
        <div class="tweet-post-date">${timeago.format(tweetData.created_at)}</div>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`

    return userTweets;
  };

  // listens for submissions from #tweet-form 
  $("#tweet-form").submit(function (event) {

    event.preventDefault();
    // parses data from tweet-form into human-readable text
    let parseData = ($(this).serialize());

    // represnts value of tweet-texts 
    const tweetText = $('#tweet-text').val();
    
    // if statement to confirm that the user has none of the error checks below and hides error message
    if (tweetText.length !== 0 || tweetText.length !== null || tweetText.length > -1) {
     $('#new-tweet-err-message').hide().text();

    }
    // if the length of the user tweet is greater 140 characters returns error message
    if (tweetText.length > 140) {
       $('#new-tweet-err-message').text("You've exceed the characer limit!").slideDown(750);

    // if the length of the users tweet is greater 140 characters returns error message
    } else if (tweetText.length === 0 || tweetText.length === null) {
        $('#new-tweet-err-message').text("Your Tweet box is empty!").slideDown(750);

    } else {
      // makes ajax post request to tweets 
      $.ajax ({
        type: "POST",
        url: "/tweets",
        //takes server data response 
        data: parseData,
        
        // calls the loadTweets function
        success: function (data) {
          loadTweets();
        }
      })
    }
  });

  const loadTweets = function  () {
    //requests JSON data from '/tweets' route 

    $.getJSON ({
      url: "/tweets",
      success: function (data) {
        // empties any existing data from previous tweets 

        $('#tweets-container').empty();
        //  and calls renderTweets function with JSON data taken from '/tweets' route

        renderTweets(data);
      }
    })
  };

  loadTweets();


});

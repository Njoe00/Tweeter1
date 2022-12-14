
$(document).ready(function() {
  // setting listener for input on tweet-text text-box

  $('#tweet-text').on("input", function() {
    const max = 140;

    // assigning length of characters inside tweet-text box
    const charCount = $(this).val().length;
    
    // setting the countter for the max number of chars vs the current value of the textbook string length
    let counting = max - charCount;

    // assigning the class 'counting' from index.html
    const counter = $(this).parent().find(".counting");

    // if the char limit is reached the numbers of the counter will turn red
    if (counting < 0) {
      counter.css('color', 'red');
    } 

    //applying the display for counting classs to our couting function
    counter.text(counting);

    if (counting > 0) {
      // if the character count goes above 0 it will return back to black
      counter.css('color', '#545454');
    }
  });
    
});




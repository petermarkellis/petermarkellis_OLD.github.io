$(function() {

// Load the JSON file containing all URLs
$.getJSON('/javascript/all-posts.json', function(data) {

	console.log(data);

	$.each(data, function() {
	  $.each(this, function(name, value) {
	    /// do stuff
	    console.log(name + '=' + value);
	  });
	});

});


/*
var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight - windowScrollPosition,
        documentHeight = $(document).height();


console.log("Window height = "+windowHeight);

console.log("Window scroll position = "+windowScrollPosition);
console.log("Window bottom scroll position = "+bottomScrollPosition);
console.log("Document height = "+documentHeight);


var didScroll = false;

$(window).scroll(function() {
    didScroll = true;
});


setInterval(function() {
    if ( didScroll ) {
        //didScroll = false;
        // Check your page position and then
        // Load in more results
        console.log("did scroll = true");
    }
}, 1000);
*/

});



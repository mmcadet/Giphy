var topics = ["Mariah Carey", "Beyonce", "Mya", "Alicia Keys", "Anita Baker", "Whitney Houston", "TLC", "Yolanda Adams", "Natalie Cole", "Rhianna"];

function renderButtons() {

	// Clear buttons before appending
	$("#displayButtons").empty();

	// Loop through topics array
	for (i=0; i < topics.length; i++) {
		// console.log(topics[i]);
		// Create button
		var a = $("<button class=\"btn btn-default\">");
		// Add class of topic
		a.addClass("topics");
		// Add data-attribute
		a.attr("data-name", topics[i]);
		// Add text to button
		a.text(topics[i]);
		// Append buttons to div displayButtons
		$("#displayButtons").append(a);
	}

}

// Add topic to array
$("#submitButton").on("click", function(){

  // Prevents the user from refreshing page 
  event.preventDefault();

  // Get input
  var newTopic = $("#addTopic").val().trim();

  // Add to topics array
  topics.push(newTopic);

  // Clear input field
  $("#addTopic").val("");

  renderButtons();      // Reset buttons
});

// Function to display Gifs on click

function displayGifs() {

	// Get topic name from button
	var topic = $(this).attr("data-name");
	// Build url to use in query to API
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=M4gOzZLTodFJz3Tac55ZRYbQ0w2bdclV";

	// Clear old Gifs
	$("#gifImages").empty();

	// Ajax and API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		// Create loop to create divs for the 10 gifs in the response array
		for (i=0;i<response.data.length;i++) {

			// Create div for gif
			var gifDiv = $("<div class=\"giffy\">");
            
			// Get image urls
			var imgURL = response.data[i].images.original.url;
			var imgURL_still = response.data[i].images.original_still.url;

			// Create img
			var imgGif = $("<img height=\"200px\"data-state=\"still\" class=\"gif\">");
			imgGif.attr("src", imgURL_still);
			imgGif.attr("data-still", imgURL_still);
			imgGif.attr("data-animate", imgURL);
            
            //Append to gifDiv
			gifDiv.append(imgGif);

            //Get rating and populate p to hold it
            var gifRating = response.data[i].rating;
            // console.log(gifRating);
			gifRating = gifRating.toUpperCase();
			var printRating = $("<p>").text("Rating: " + gifRating);
            
            // Append rating to gifDiv
			gifDiv.append(printRating);

			// Append gifDiv to gifImages div on page
			$("#gifImages").append(gifDiv);
		}
	});
}

// Create initial buttons on page
renderButtons();

// Adding click events to elements of topics class
$(document).on("click", ".topics", displayGifs);

$(document).on("click",".gif", function() {
	// Create variable to get image state
	var state = $(this).attr("data-state");
    // console.log(state);
    
	// Check for animation or not
	if (state == "still") {
		// Change to animating src and change data-state
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		// Change to still src and change data-state
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})

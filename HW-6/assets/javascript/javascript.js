$(document).ready(function() {
	var animals = ["cats", "dogs", "pandas", "horses", "owls"];

	function displayGifButtons() {
		$("#gifButtonsView").empty(); 

			for(var i=0; i<animals.length; i++) {
				var gifButton = $("<buttons>");
				gifButton.addClass("animals");
				gifButton.addClass("btn btn-primary")
				gifButton.attr("data-name", actions[i]);
				gifButton.text(animals[i]);
				$("#gifButtonsView").append(gifButton);

			}
	}

	function addNewButton() {
		$("#addGif").on("click", function() {
			var action = $("#animal-input").val().trim();
			if (action =="") {
				return false;
			}
			actions.push(action);

			displayGifButtons();
			return false;
		});
	}

	function removalLastButton() {
		$("#removeGif").on("click", function() {
			animals.pop(animal);
			displayGifButtons();
			return false;
		});
	}
	function displayGifs() {
		var action= $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "get"
		})

		.done(function(response) {
			console.log(response);
			$("#gifsView").empty();
			var results == response.data;
			if (results == "") {
				alert("there isn't a gif for this button")
			}
			for (var i=0; i<results.length; i++) {

				var gifDiv= $("<div>");
				gifDiv.addClass("gifDiv");

				var gifRating = $("<p>").text("Rating:" + results[i].rating);
				gifDiv.append(gifRating);

				var gifImage = $("<img>");
				
				gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            	
            	gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            
            	gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            
            	gifImage.attr("data-state", "still"); 
            	
            
            	gifImage.addClass("image");
           
           		 gifDiv.append(gifImage);
            
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons(); // displays list of actions already created
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});

			
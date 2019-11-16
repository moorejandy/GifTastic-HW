
    var topics = ["Trees", "Mountains", "Rivers", "Birds"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayNatureInfo() {  
    var nature = $(this).attr("data-nature");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nature + "&apikey=CT4Y47BalJjJcdIaWaJaqo7sMAE7U6Go&limit=10&offset=0&rating=G&lang=en";

    //   Creates AJAX call for the specific button being clicked
    
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var natureDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var natureImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            natureImage.attr("src", results[i].images.fixed_height_still.url);
            natureImage.attr("data-animate", results[i].images.fixed_height.url);
            natureImage.attr("data-still", results[i].images.fixed_height_still.url);
            natureImage.attr("data-state", "still");
            natureImage.addClass("nature-image");

            console.log(natureImage);
            // Appending the paragraph and image tag to the animalDiv
            natureDiv.append(p);
            natureDiv.append(natureImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-view").prepend(natureDiv);
          }
      });
    }
    // Function for displaying nature data
    function renderButtons() {

      // Deleting the searches prior to adding new ones
      // to avoid repeat buttons
      $("#buttons-view").empty();

      // Looping through the array of topics
      for (var i = 0; i < topics.length; i++) {

        //dynamicaly generating buttons for each topic in the array
        var a = $("<button>");
        // Adding a class of nature-btn to our button
        a.addClass("nature-btn");
        // Adding a data-attribute
        a.attr("data-nature", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where a nature button is clicked
    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var addTopic = $("#gif-input").val().trim();

      // Adding topic from the textbox to array
      topics.push(addTopic);
        console.log(topics);

    //empty value from text box after button is created
    
        $("#gif-input").val("");
      // Calling renderButtons which handles the processing of topics array
      renderButtons();

    });

    // Adding a click event listener to all elements with a class of "nature-btn"
    $(document).on("click", ".nature-btn", displayNatureInfo);

    $(document).on("click", ".nature-image", function(){
            // event.preventDefault();

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
      });



    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
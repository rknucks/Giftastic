$(document).ready(function () {
var topics = ["Colorado Buffaloes Football", "Oklahoma Sooners Football", "Michigan Wolverines Football", "Arizona Wildcats Football", "Arizona State Sun Devils Football", "Texas Longhorns Football", "Florida Gators Football", "Nebraska Cornhuskers Football"];

function renderButtons() {
//no repeat buttons
  $("#buttons-team").empty();
    
     // Looping through the array of teams -- putting the teams on buttons
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
     
      a.addClass("football");
      
      a.attr("data-team", topics[i]);
      
      a.text(topics[i]);
      
      $("#buttons-team").append(a);

    };
   
    };
  
  
  $("#add-team").on("click", function(event) {
    
    event.preventDefault();

   
    var team = $("#team-input").val().trim();

  if (!topics.includes(team)) {
    topics.push(team);
    renderButtons();
   
  }
    else {
      alert("Team is allready chosen")
    }
    $("#team-input").val("");
  });
   
    renderButtons();
  
  
  
    // creating the function that will show the gifs when a button is clicked
    function showTeam()  {
    
    var footballTeam = encodeURIComponent($(this).attr("data-team"));

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        footballTeam + "&api_key=d7nlV1AnQURJjIi5a4KoQWoEEJc1i8KP&limit=10";
        console.log(queryURL);
      //  AJAX request 
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      

      // After data comes back from the request
      .then(function(response) {
        
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        //emptying the gif div so all results are not stacked
        $("#gifs-here").empty();
        
        for (var i = 0; i < results.length; i++) {

          
          var schoolDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          
          var teamImage = $("<img>");
          
          
          teamImage.attr("src", results[i].images.fixed_height_still.url);
          teamImage.attr("data-still", results[i].images.fixed_height_still.url);
          teamImage.attr("data-animate", results[i].images.fixed_height.url)
          teamImage.attr("data-state", "still")
          teamImage.addClass("gif");

          
          schoolDiv.append(p);
          schoolDiv.append(teamImage);

          $("#gifs-here").prepend(schoolDiv);
        };
      });
      };
      $("#gifs-here").on("click", ".gif", function(event){
        event.preventDefault();
        
        // gets the current state of the clicked gif 
        var state = $(this).attr("data-state");
        
        // still to animate, and back to still
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      })
      // calling our show the gif function
      $(document).on("click", ".football", showTeam);
    });
  
  
      
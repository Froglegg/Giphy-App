        var gifList = [];

        function gifSearch(event) {
            event.preventDefault();
            // Here we grab the text from the input box
            var searchTerm = $("#searchTerm").val();
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=9";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                response.data.forEach(element => {
                    console.log(element.rating);
                    $("#gifArea").prepend("<div class='gifContainer'><img id='gif' src='" + element
                        .images.fixed_width_still.url + "' data-state='still' data-still='" +
                        element.images.fixed_width_still.url + "' data-active='" + element.images
                        .fixed_width.url + "' >" + "</div>");
                });

            });
            gifList.push(searchTerm);

            $("#footer-text").text("Now don't that make you feel betta!?");
        }


        $("#searchButton").on("click", function () {
            gifSearch(event);
            renderButtons();
            renderResetBtn();
            $("#searchTerm").val("");
        });

        $(document).on('click', '#gif', function () {
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-active"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

        // this will register the attribute of the gif
        $(document).on('click', '.gifBtn', function () {
            var gifName = $(this).attr("data-name");
            $("#searchTerm").val(gifName);
            $("#gifArea").empty();

            for (var i = 0; i < gifList.length; i++) {
                var index = gifList.indexOf(gifName);
                if (index !== -1) {
                    gifList.splice(index, 1);
                }
            }
            gifSearch(event);
            
        });

        // this will empty the gifList and reset the buttons list
        $(document).on('click', '#resetBtn', function () {
            gifList = [];
            $("#buttons-view").empty();
        });

        function renderButtons() {
            $("#buttons-view").empty();
            $("#gifArea").empty();
            for (var i = 0; i < gifList.length; i++) {
                var a = $("<button>");
                a.addClass("button1 gifBtn");
                a.attr("data-name", gifList[i]);
                a.text(gifList[i]);
                $("#buttons-view").append(a);
            }
        }

        function renderResetBtn() {
            $("#clear-buttons").empty();
            var reset = $("<button>");
            reset.addClass("button1 resetBtn");
            reset.attr("id", "resetBtn");
            reset.text("Clear List");
            $("#clear-buttons").append(reset);
        }

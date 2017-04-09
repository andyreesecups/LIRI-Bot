var request = require("request");
var spotify = require("spotify");
var nodeArgs = process.argv;
var movieName = "";
var spotifyThis = "";


//--------------------------- Spotify -----------------------------------//



if (nodeArgs[2] === 'spotify-this-song') {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            spotifyThis = spotifyThis + "+" + nodeArgs[i];

        } else {

            spotifyThis += nodeArgs[i];

        }
    }

    spotify.search({ type: 'track', query: spotifyThis }, function(err, data) {

        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }


        console.log("This is the album name: " + data.tracks.items[0].album.name);
        console.log("This song name is: " + data.tracks.items[0].name);
        console.log("The artist's name: " + JSON.stringify(data.tracks.items[0].artists[0].name));
        console.log("Preview the song here: " + data.tracks.items[0].preview_url);

    });

}

// -------------------------- OMDB Stuff ---------------------------
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
if (nodeArgs[2] === 'movie-this') {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            movieName += nodeArgs[i];

        }
    }


    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rated: " + JSON.parse(body).Rated);
        console.log("Country film was produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

} // Ends if statement

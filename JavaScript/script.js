//apiKey = d999ebd26747e0c3f46ea86ac84f73f3
const posterImage = document.getElementById('moviePoster');

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Gets movie data genre from API to include: poster, title, and summary
function fetchMovieData(genreId) {

  const pageNumber = getRandomNumber(20);
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${pageNumber}&language=en-US&api_key=d999ebd26747e0c3f46ea86ac84f73f3`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const chosenMovie = data.results[2];
      const moviePosterEl = document.getElementById('moviePoster')
      const posterSrc = 'https://image.tmdb.org/t/p/w185'

      // Display movie poster
      moviePosterEl.src = posterSrc + chosenMovie.poster_path
      console.log(chosenMovie.title);
      console.log(chosenMovie.poster_path);
      console.log(chosenMovie);

      // Displays movie title
      const chosenMovieEl = document.getElementById('chosenMovie');
      chosenMovieEl.textContent = `Movie: ${chosenMovie.title}`;

      // Display summary of movie
      const movieOverview = document.getElementById('movie-overview');
      movieOverview.textContent = `Summary: ${chosenMovie.overview}`;

      // Display release date
      // Display summary of movie
      const movieDate = document.getElementById("release-date");
      movieDate.textContent = `Summary: ${chosenMovie.release_date}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//  Gets random drink w/ name and instructions
function fetchRandomDrink() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var drinkImg = data.drinks[0].strDrinkThumb
      console.log(drinkImg)
      const chosenDrink = data.drinks[0].strDrink;
      // Displays drink photot
      const drinkPhotoEl = document.getElementById('drinkPhoto')
      drinkPhotoEl.src = drinkImg
      // Displays name of drink
      const chosenDrinkEl = document.getElementById("chosenDrink");
      chosenDrinkEl.textContent = `Drink: ${chosenDrink}`;
      // Displays the glass for the drink
      const drinkGlassEl = document.getElementById("drink-glass");
      drinkGlassEl.textContent = `Glass for drink: ` + data.drinks[0].strGlass;

      // Create loop to cycle through up to 15 ingredients
      for (let i=1; i < 16; ++i) {
      
        // Creates a list for ingredients
      const drinkIngreds = document.createElement('li');
      console.log(i)

      // Breaks loop of adding empty measurements
      if (data.drinks[0][`strMeasure${i}`] == null) {
        break;
      }

      // Displays ingredients and measurements for drinks
      drinkIngreds.innerHTML = data.drinks[0][`strMeasure${i}`] + ': ' + data.drinks[0][`strIngredient${i}`];

      const IngredSection = document.getElementById("drink-ingredients");
      IngredSection.append(drinkIngreds);
      }

      // Displays instructions
      const drinkInstruct = document.getElementById('drink-instructions');
      drinkInstruct.textContent = `Instructions: ${data.drinks[0].strInstructions}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Once one of the buttons are clicked the genre id linked to each button will display
// the chosen genre w/ a drink: name, ingredients, measurements and instructions
function getSuggestion(button) {
  const selectedGenre = button.getAttribute('genre-id');

  fetchMovieData(selectedGenre);
  fetchRandomDrink();
}

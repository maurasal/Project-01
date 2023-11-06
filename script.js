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



const favoritesButton = document.getElementById('save-favorite');
const favoritesList = document.getElementById('favorites-list');
const customNotification = document.getElementById('custom-notification');
const notificationText = document.getElementById('notification-text');

favoritesButton.addEventListener('click', () => {
  const selectedMovie = document.getElementById('chosenMovie').textContent.replace('Movie: ', '');
  const selectedCocktail = document.getElementById('chosenDrink').textContent.replace('Drink: ', '');

  // Get the list of ingredients
  const ingredientsList = [];
  const ingredientsElements = document.querySelectorAll('#drink-ingredients li');
  ingredientsElements.forEach((ingredientElement) => {
    ingredientsList.push(ingredientElement.textContent);
  });

  // Save the selected movie, cocktail, and ingredients to localStorage
  saveToLocalStorage(selectedMovie, selectedCocktail, ingredientsList);

  // Show a custom notification
  notificationText.textContent = 'Your selected pairing has been added to the favorites list!';
  customNotification.classList.add('fade-in');
  customNotification.style.display = 'block';
  // alert('Your selected pairing has been added to the favorites list!');


  // clear the chosenMovie and chosenDrink elements to allow the user to continue selecting favorites
  document.getElementById('chosenMovie').textContent = '';
  document.getElementById('chosenDrink').textContent = '';

  // hide the custom notification after a few seconds
  setTimeout(() => {
    customNotification.style.display = 'none';
    customNotification.classList.remove('fade-in');
  }, 3000); // Hide after 3 seconds

  // Refresh the favorites list to display the updated list
  refreshFavoritesList();
});

function saveToLocalStorage(movie, cocktail, ingredients) {
  // Load existing favorites from localStorage 
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Save the selected movie, cocktail, and ingredients
  const favoritePairing = { movie, cocktail, ingredients };
  favorites.push(favoritePairing);

  // Save the updated favorites array back to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function refreshFavoritesList() {
  favoritesList.innerHTML = '';

  // Load existing favorites from localStorage or start empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Display the updated list of favorites
  for (const favoritePairing of favorites) {
    const listItem = document.createElement('li');
    listItem.textContent = `Movie: ${favoritePairing.movie}, Cocktail: ${favoritePairing.cocktail}, Ingredients: ${favoritePairing.ingredients.join(', ')}`;
    favoritesList.appendChild(listItem);
  }
}

// Initial load of favorites 
refreshFavoritesList();

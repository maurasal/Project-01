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


  // Clear the chosenMovie and chosenDrink elements to allow the user to continue selecting favorites
  document.getElementById('chosenMovie').textContent = '';
  document.getElementById('chosenDrink').textContent = '';

  // Hide the custom notification after a few seconds (you can adjust the timeout as needed)
  setTimeout(() => {
    customNotification.style.display = 'none';
    customNotification.classList.remove('fade-in');
  }, 3000); // Hide after 3 seconds

  // Refresh the favorites list to display the updated list
  refreshFavoritesList();
});

function saveToLocalStorage(movie, cocktail, ingredients) {
  // Load existing favorites from localStorage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Save the selected movie, cocktail, and ingredients
  const favoritePairing = { movie, cocktail, ingredients };
  favorites.push(favoritePairing);

  // Save the updated favorites array back to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function refreshFavoritesList() {
  favoritesList.innerHTML = '';

  // Load existing favorites from localStorage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Display the updated list of favorites
  for (const favoritePairing of favorites) {
    const listItem = document.createElement('li');
    listItem.textContent = `Movie: ${favoritePairing.movie}, Cocktail: ${favoritePairing.cocktail}, Ingredients: ${favoritePairing.ingredients.join(', ')}`;
    favoritesList.appendChild(listItem);
  }
}

// Initial load of favorites on page load
refreshFavoritesList();
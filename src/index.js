import './style.css';

// retrieve data from the API
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
  .then((response) => response.json())
  .then((data) => {
    // get the first six items from the API
    const items = data.meals.slice(0, 6);

    // loop through each item and create HTML elements to display them
    items.forEach((item) => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');

      const img = document.createElement('img');
      img.src = item.strMealThumb;
      img.alt = item.strMeal;
      foodItem.appendChild(img);

      const h2 = document.createElement('h2');
      h2.textContent = item.strMeal;
      foodItem.appendChild(h2);

      const button = document.createElement('button');
      button.textContent = 'Submit';
      button.addEventListener('click', () => {
        // add code to show popup window here
      });
      foodItem.appendChild(button);

      document.getElementById('food-items').appendChild(foodItem);
    });
  });

export const openPopup = async (id) => {
  const requestUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const mealDetails = await response.json();
  const meal = mealDetails.meals[0];

  const response2 = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NlNM9j8v13hokI4u8SYL/comments?item_id=${id}`,
  );

  const comments = await response2.json();

  const popupHTML = `
    <div class="popup">
      <div class="popup-content">
        <img src="${meal.strMealThumb}" class="popup-img" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
          ${meal.strIngredient1 ? `<li>${meal.strIngredient1} - ${meal.strMeasure1}</li>` : ''}
          ${meal.strIngredient2 ? `<li>${meal.strIngredient2} - ${meal.strMeasure2}</li>` : ''}
          ${meal.strIngredient3 ? `<li>${meal.strIngredient3} - ${meal.strMeasure3}</li>` : ''}
          ${meal.strIngredient4 ? `<li>${meal.strIngredient4} - ${meal.strMeasure4}</li>` : ''}
          ${meal.strIngredient5 ? `<li>${meal.strIngredient5} - ${meal.strMeasure5}</li>` : ''}
          ${meal.strIngredient6 ? `<li>${meal.strIngredient6} - ${meal.strMeasure6}</li>` : ''}
          ${meal.strIngredient7 ? `<li>${meal.strIngredient7} - ${meal.strMeasure7}</li>` : ''}
          ${meal.strIngredient8 ? `<li>${meal.strIngredient8} - ${meal.strMeasure8}</li>` : ''}
          ${meal.strIngredient9 ? `<li>${meal.strIngredient9} - ${meal.strMeasure9}</li>` : ''}
          ${meal.strIngredient10 ? `<li>${meal.strIngredient10} - ${meal.strMeasure10}</li>` : ''}
        </ul>
        <form id="comment-form">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br><br>
          <label for="comment">Comment:</label>
          <textarea id="comment" name="comment" required></textarea><br><br>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
        <h3 id="comment-title">Comments: (<span id="comment-count">${comments.length}</span>)</h3>
        <div id="comment-section"></div>
        <button type="button" class="btn btn-danger pull-right" pull-left" onclick="closePopup()">&times;</button>
        <hr>
      </div>
    </div>
  `;

  document.body.innerHTML += popupHTML;

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;
    const data = { item_id: id, username, comment };

    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NlNM9j8v13hokI4u8SYL/comments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();

    const commentSection = document.getElementById('comment-section');
    const commentHTML = `
      <div>
        <p><b>${result.username}</b></p>
        <p>${result.comment}</p>
        <p>${result.creation_date}</p>
      </div>
    `;
    commentSection.innerHTML += commentHTML;
    commentForm.reset();
  });

  const commentSection = document.getElementById('comment-section');
  const commentsHTML = comments.map((comment) => `
    
      <div>
        <p>${comment.creation_date}: <b>${comment.username}</b></p>
        <p>${comment.comment}</p>
      </div>`);
  commentSection.innerHTML = commentsHTML.join('');
};

export const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentNode.removeChild(popup);
};
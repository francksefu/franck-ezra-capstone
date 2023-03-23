import './style.css';

const main = document.querySelector('main');

function complete(f) {
  const ligne = document.createElement('div');
  ligne.classList.add('row');
  main.appendChild(ligne);
  for (let i = 0; i < 6; i += 1) {
    ligne.innerHTML += `
      <div class="col-md-4 mt-3 mb-3">
        <div class="card">
          <img src="${f[i].strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${f[i].strMeal}</h5>
            <p class="card-text"><span class="material-symbols-outlined">
              favorite
            </span><br> <span class="likes"> 5 likes </span></p>
            <a href="#" class="btn btn-success" onclick="openPopup('${f[i].idMeal}')">Comment</a>
          </div>
        </div>
      </div>
    `;
  }
}

async function received() {
  const requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const mealsNameTxt = await response.json();
  const data = mealsNameTxt.meals.slice(0, 6);
  complete(data);
}


window.openPopup = async function (id) {
  const requestUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const mealDetails = await response.json();
  const meal = mealDetails.meals[0];

  const response2 = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NlNM9j8v13hokI4u8SYL/comments?item_id=${id}`
  );
  
  const comments = await response2.json();
  if(comments.length === null ){
    return 0;
  }else {
    comments.length;
  }

  
  const popupHTML = `
    <div class="popup">
      <div class="popup-content">
        <img src="${meal.strMealThumb}" class="popup-img" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <form id="comment-form">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br><br>
          <label for="comment">Comment:</label>
          <textarea id="comment" name="comment" required></textarea><br><br>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
        <h3 id="comment-title">Comments: (${comments.length})</h3>
        <div id="comment-section"></div>
        <button class="btn btn-danger" onclick="closePopup()">Close</button>
      </div>
    </div>
  `;

  document.body.innerHTML += popupHTML;

  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const comment = document.getElementById("comment").value;
    const data = { item_id: id, username: username, comment: comment };
    const response = await fetch(
      "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NlNM9j8v13hokI4u8SYL/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    const commentSection = document.getElementById("comment-section");
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

  
  const commentSection = document.getElementById("comment-section");
  const commentsHTML = comments.map((comment) => {
    return `
    
      <div>
        <p>${comment.creation_date}: <b>${comment.username}</b></p>
        <p>${comment.comment}</p>
      </div>`
   
  });
  commentSection.innerHTML = commentsHTML.join("");
};


window.closePopup = function () {
  const popup = document.querySelector('.popup');
  popup.parentNode.removeChild(popup);
};

window.addEventListener('load', () => {
  received();
});

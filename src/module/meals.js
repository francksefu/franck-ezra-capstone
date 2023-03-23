const main = document.querySelector('main');

export async function complete(f) {
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

export async function received() {
  const requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const mealsNameTxt = await response.json();
  const data = mealsNameTxt.meals.slice(0, 6);
  complete(data);
}

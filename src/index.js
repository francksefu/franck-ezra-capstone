import './style.css';
import compteur from './Modules/compteurItem.js';

import { openPopup, closePopup } from './Modules/popUp.js';

const main = document.querySelector('main');
let numberItem = 0;
const numtag = document.querySelector('#display');

const thinker = (Arry, item) => {
  let ret = '';
  Arry.forEach((element) => {
    if (element.item_id === item) {
      ret = element.likes;
    }
  });
  return ret;
};

const sendi = (keys) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OIXK64DiFrG4uF3oMK7b/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: keys,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  setTimeout(() => { window.location.reload(); }, 2000);
};

const complete = (f, likes) => {
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
            <p class="card-text"><span id="${f[i].strMeal}" class="material-symbols-outlined">
              favorite
            </span><br>  ${thinker(likes, f[i].strMeal)} likes </p>
            <a href="#" class="btn btn-success" onclick="openPopup('${f[i].idMeal}')">Comment</a>
          </div>
        </div>
      </div>
    `;
  }
  const liker = document.querySelectorAll('span');
  for (let i = 0; i < liker.length; i += 1) {
    liker[i].addEventListener('click', () => {
      liker[i].classList.add('text-success');
      sendi(liker[i].id);
    });
  }
  numberItem = compteur(liker);
  numtag.textContent = `List of items : ${numberItem}`;
};

async function received() {
  const requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
  const request = new Request(requestUrl);
  const response = await fetch(request);
  const mealsNameTxt = await response.json();
  const data = mealsNameTxt.meals.slice(0, 6);

  /**
   * Display likes
   */

  const requestUrlL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OIXK64DiFrG4uF3oMK7b/likes';
  const requestL = new Request(requestUrlL);
  const responseL = await fetch(requestL);
  const scoreNameTxtL = await responseL.text();
  const scoreNameL = JSON.parse(scoreNameTxtL);
  complete(data, scoreNameL);
}

async function display() {
  await received();
  window.openPopup = openPopup;
  window.closePopup = closePopup;
}

display();

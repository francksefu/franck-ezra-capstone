/**
 * @jest-environment jsdom
 */

import compteur from "./compteurItem";

test('add something', () => {
    for (let i = 0; i < 6; i += 1) {
        document.body.innerHTML += ''
          + '<div class="col-md-4 mt-3 mb-3">'
          + '<div class="card">'
          + '<img src="${f[i].strMealThumb}" class="card-img-top" alt="...">'
          + '<div class="card-body">'
          + '<h5 class="card-title">${f[i].strMeal}</h5>'
          + '<p class="card-text"><span id="${f[i].strMeal}" class="material-symbols-outlined">'
          + ' favorite'
          + '</span><br>  ${thinker(likes, f[i].strMeal)} likes </p>'
          + '<a href="#" class="btn btn-success" >Comment</a>'
          + '</div>'
          + '</div>'
          + '</div>';
        }
        const span = document.querySelectorAll('span');
    expect(compteur(span)).toBe(6);
  });
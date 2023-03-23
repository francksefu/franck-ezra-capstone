import './style.css';

import { received } from './module/meals.js';
import { openPopup, closePopup } from './module/popup.js';

async function main() {
  await received();
  window.openPopup = openPopup;
  window.closePopup = closePopup;
}

main();

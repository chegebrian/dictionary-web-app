import { displayFonts } from "./js/displayfonts.js";
import { generateMarkup, mainEl } from "./js/markup.js";

const searchEl = document.querySelector("#search");
const dropdownEl = document.getElementById("dropdownRadioButton");
const formEl = document.querySelector(".form");

dropdownEl.addEventListener("click", displayFonts);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchEl.value;
  generateMarkup(query);
  searchEl.value = "";
});

import { displayFonts } from "./js/displayfonts.js";
import { generateMarkup } from "./js/markup.js";

const searchEl = document.querySelector("#search");
const dropdownEl = document.getElementById("dropdownRadioButton");
const formEl = document.querySelector(".form");

dropdownEl.addEventListener("click", displayFonts);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchEl.value;
  console.log(query);
  generateMarkup(query);
  searchEl.value = "";
});


window.addEventListener("hashchange", () => {
  const idQuery = window.location.hash.slice(1);
  generateMarkup(idQuery);
  console.log(idQuery);
});

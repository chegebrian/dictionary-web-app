import { displayFonts } from "./js/displayfonts.js";
import { generateMarkup } from "./js/markup.js";

const searchEl = document.querySelector("#search");
export const dropdownEl = document.getElementById("dropdownRadioButton");
const formEl = document.querySelector(".form");
const switchEl = document.querySelector(".switch");
const htmlEl = document.querySelector(".html");
const themes = document.querySelectorAll("input[name='theme']");

dropdownEl.addEventListener("click", displayFonts);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchEl.value;
  generateMarkup(query);
  searchEl.value = "";
});

window.addEventListener("hashchange", () => {
  const idQuery = window.location.hash.slice(1);
  generateMarkup(idQuery);
});

window.addEventListener("load", () => {
  const idQuery = window.location.hash.slice(1);
  generateMarkup(idQuery);
});


switchEl.addEventListener("click", (e) => {
  htmlEl.classList.toggle("dark");
});

// save the to local storage

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

themes.forEach((theme) => {
  theme.addEventListener("click", () => {
    saveTheme(theme.id);
  });
});

// retreive theme and set the theme

function retreiveTheme() {
  const selectedTheme = localStorage.getItem("theme")

  themes.forEach((theme) => {
    if(theme.id === selectedTheme){
      theme.checked = true;
    }
  })

  document.documentElement.className = selectedTheme;
}

window.onload = retreiveTheme();

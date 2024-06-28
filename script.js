import { displayFonts } from "./js/displayfonts.js";
import { generateMarkup } from "./js/markup.js";

let query = "apple";
const dropdownEl = document.getElementById("dropdownRadioButton");

dropdownEl.addEventListener("click", displayFonts);
generateMarkup(query);

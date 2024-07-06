import { dropdownEl } from "../script.js";
const dropdownItems = document.getElementById("dropdownDefaultRadio");
export function displayFonts() {
  dropdownItems.classList.toggle("hidden");
}

window.addEventListener("scroll", () => {
  dropdownItems.classList.add("hidden");
});

document.addEventListener("click", (e) => {
  if (!dropdownEl.contains(e.target) && !dropdownItems.contains(e.target)) {
    dropdownItems.classList.add("hidden");
  }
});

const dropdownItems = document.getElementById("dropdownDefaultRadio");
export function displayFonts() {
  dropdownItems.classList.toggle("hidden");
}

window.addEventListener("scroll", ()=> {
  dropdownItems.classList.add("hidden");
});
import { mainEl } from "./markup.js";

export async function getQuery(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    if (!response.ok) throw new Error("No Definition found");
    const data = await response.json();
    return data;
  } catch (error) {
    displayError(error.message);
  }
}

function displayError(message) {
  const markup = `
    <div class="spinner flex items-center justify-center dark:text-slate-200">
  <p>${message}</p>
  </div>
  `
mainEl.innerHTML = "";
mainEl.insertAdjacentHTML("beforeend", markup);
}
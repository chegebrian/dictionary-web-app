import { API_URL } from "./config.js";
import { getQuery } from "./helper.js";
export const mainEl = document.querySelector(".main");
const soundEl = document.querySelector("#sound");
export const state = {
  query: {},
};

function clear() {
  mainEl.innerHTML = "";
}

function createQuery(data) {
  const query = data[0];
  return {
    word: query.word,
    phonetic: query.phonetic,
    phonetics: query.phonetics,
    meanings: query.meanings,
  };
}

function playSound() {
  soundEl.play();
}

mainEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    playSound();
  }
});

async function getAudio(audioSrc) {
  let res = await fetch(audioSrc);
  let blob = await res.blob();
  soundEl.src = URL.createObjectURL(blob);
}

let meanings = [];
let sources = [];

export async function generateMarkup(query) {
  try {
    displaySpinner(mainEl);
    const data = await getQuery(API_URL, query);
    state.query = createQuery(data);
    console.log(data);
    data.forEach((element) => {
      meanings.push(element.meanings);
    });
    data.forEach((element) => {
      sources.push(element.sourceUrls);
    });

    let srcUrl = sources.flat();
    let def = meanings.flat();

    console.log(srcUrl);
    let obj = def[0];
    let synonymLabel = Object.keys(obj).find((key) => key === "synonyms");
    let antonymLabel = Object.keys(obj).find((key) => key === "antonyms");
    let audio = state.query.phonetics.find((sound) => {
      return sound.audio !== "";
    });

    let audioSrc = audio?.audio;
    getAudio(audioSrc);
    const markup = `
            <section class="flex items-center justify-between">
          <div class="flex items-start gap-3 flex-col">
            <h1 class="word text-3xl font-semibold dark:text-slate-50">${
              state.query.word
            }</h1>
            <p class="phonetic text-lg font-semibold text-purple-500">${
              state.query.phonetic ? state.query.phonetic : ""
            }</p>
          </div>
          <button class="bg-purple-500 w-12 h-12 rounded-full btn">
            <i class="fa-solid fa-play btn" style="color: #ffffff"></i>
          </button>
        </section>
        <section class="content my-6">
        ${def
          .map((meaning) => {
            return `
          
            <h3 class="text-lg font-bold italic dark:text-slate-50">${
              meaning.partOfSpeech
            }</h3>
            <p class="capitalize dark:text-slate-50">meaning</p>
            <ul class="meaning-list pl-4">
            ${meaning.definitions
              .map((definition) => {
                return `
                
                <li class="definition">
                  <p class="definition-text text-slate-950 mt-2 dark:text-slate-50">${
                    definition.definition
                  }</p>
                  <span class="definition-example text-slate-500">${
                    definition.example ? definition.example : ""
                  }</span>
                </li>
                
                `;
              })
              .join("")}
              </ul>
              <div class="synonym-section flex gap-4">
              <p class="synonym-label dark:text-slate-400">${
                meaning.synonyms.length === 0 ? "" : synonymLabel
              }</p>
              <ul class="synonym-list flex">
              ${meaning.synonyms
                .map((synonym) => {
                  return `<li class="cursor-pointer synonym text-purple-500"><a href="/#${synonym}">${synonym}</a></li>`;
                })
                .join(", ")}
              </ul>
              </div>
              <div class="antonym-section flex gap-4">
                <p class="antonym-label dark:text-slate-400">${
                  meaning.antonyms.length === 0 ? "" : antonymLabel
                }</p>
                <ul class="antonym-list flex">
                  ${meaning.antonyms
                    .map((antonym) => {
                      return `
                      <li class="cursor-pointer antonym text-purple-500" ><a href="/#${antonym}">${antonym}</a></li>
                    `;
                    })
                    .join(", ")}
                  </ul>
              </div>

          `;
          })
          .join("")}
          </section>
          <section class="source-url">
          <p class="source label dark:text-slate-50">${
            srcUrl.length === 0 ? "" : "Source"
          }</p>
          <ul>
          ${srcUrl
            .map((src) => {
              return `
            <li class="dark:text-slate-400">
              <a href="${src}" target="_blank">${src}</a>
            </li>`;
            })
            .join("")}
          </ul>
          </section>
    `;
    clear();
    meanings.length = 0;
    sources.length = 0;
    mainEl.innerHTML = markup;
  } catch (error) {
    console.warn(error);
  }
}

function displaySpinner(parentEl) {
  const markup = `
  <div class="spinner flex items-center justify-center">
  <i class="fa-solid fa-spinner fa-spin fa-2xl" style="color: #B197FC;"></i>
  </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup)
}
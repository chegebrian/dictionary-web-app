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
console.log(mainEl);
function createQuery(data) {
  const query = data[0];
  console.log(query.phonetics);
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

const controller = new AbortController();
const signal = controller.signal;

async function getAudio(audioSrc) {
  let res = await fetch(audioSrc);
  let blob = await res.blob();
  console.log(blob);
  soundEl.src = URL.createObjectURL(blob);
}

let meanings = [];

export async function generateMarkup(query) {
  try {
    const data = await getQuery(API_URL, query);
    console.log(data);
    state.query = createQuery(data);
    data.forEach((element) => {
      meanings.push(element.meanings);
    });
    let def = meanings.flat();
    console.log(def);
    let obj = def[0];
    console.log(obj);
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
            <h1 class="word">${state.query.word}</h1>
            <p class="phonetic">${
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
            console.log(meaning);

            return `
          
            <h3>${meaning.partOfSpeech}</h3>
            <p>meaning</p>
            <ul class="meaning-list pl-4">
            ${meaning.definitions
              .map((definition) => {
                return `
                
                <li class="definition">
                  <p class="definition-text">${definition.definition}</p>
                  <span class="definition-example">${
                    definition.example ? definition.example : ""
                  }</span>
                </li>
                
                `;
              })
              .join("")}
              </ul>
              <div class="synonym-section flex gap-4">
              <p class="synonym-label">${meaning.synonyms.length === 0 ? "" : synonymLabel}</p>
              <ul class="synonym-list flex">
              ${meaning.synonyms
                .map((synonym) => {
                  return `
                  <li>${synonym}</li>
                `;
                })
                .join(", ")}
              </ul>
              </div>
              <div class="antonym-section flex gap-4">
                <p class="antonym-label">${meaning.antonyms.length === 0 ? "" : antonymLabel}</p>
                <ul class="antonym-list flex">
                  ${meaning.antonyms
                    .map((antonym) => {
                      return `
                      <li>${antonym}</li>
                    `;
                    })
                    .join(", ")}
                  </ul>
              </div>

          `;
          })
          .join("")}
          </section>
    `;
    clear();
    meanings.length = 0;
    mainEl.innerHTML = markup;
    console.log(def);
  } catch (error) {
    console.warn(error);
  }
}


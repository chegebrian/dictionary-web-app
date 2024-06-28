import { API_URL } from "./config.js";
import { getQuery } from "./helper.js";
const mainEl = document.querySelector(".main");

export const state = {
  query: {},
};

function createQuery(data) {
  const query = data[0];
  console.log(query.phonetics);
  return {
    word: query.word,
    phonetic: query.phonetic,
    phonetics: query.phonetics,
  };
}


function play22() {

  console.log('hello');
}

export async function generateMarkup(query) {
  try {
    const data = await getQuery(API_URL, query);
    console.log(data);
    state.query = createQuery(data);
    console.log(state.query.phonetics);
    let audio = await state.query.phonetics.find((sound) => {
      return sound.audio !== "";
    });
    let audioSrc = audio.audio;
    console.log(audioSrc);
    const markup = `
            <section class="flex items-center justify-between">
          <div class="flex items-center gap-3 flex-col">
            <h1 class="word">${state.query.word}</h1>
            <p class="phonetic">${state.query.phonetic}</p>
          </div>
          <button class="bg-purple-500 w-12 h-12 rounded-full" onclick=${play22}>
            <i class="fa-solid fa-play" style="color: #ffffff"></i>
          </button>


        </section>
    `;
    mainEl.innerHTML = markup;
  } catch (error) {}
}


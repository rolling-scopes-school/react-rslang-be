import { endGame } from "./content";
import { IWords, IRamdom, IflagStartGame } from "./interface";
import { answerSprint, getGameListener } from "./listener";

const audio = new Audio();
export const flagStartGame: IflagStartGame = {
  value: null,
  indexStart: 0,
};

export function startTimer() {
  playAudioTimer();
  let timerId;
  const timer = <HTMLElement>document.querySelector(".timer");
  if (!(timer?.textContent === "0")) {
    timer.textContent = `${Number(timer.textContent) - 1}`;
    timerId = setTimeout(startTimer, 1000);
  } else {
    flagStartGame.indexStart = 0;
    const counterSprint = document.querySelector(".counter-sprint");
    if (counterSprint) {
      const buttonAnswer = document.querySelectorAll(".btn-answer");
      buttonAnswer.forEach((elem) =>
        elem.removeEventListener("click", getGameListener)
      );
      const resultSprint = counterSprint?.textContent;
      clearTimeout(timerId);
      endGame(resultSprint, answerSprint);
    }
  }
}

export function getramdomWord() {
  const ar = [true, false];
  let rand = Math.round(Math.random());
  flagStartGame.value = String(ar[rand]); 
  const obj: IRamdom = {
    bool: ar[rand],
    numWord: NaN,
    wordTranslate: NaN,
  };

  if (ar[rand]) {
    obj.numWord = flagStartGame.indexStart;
    obj.wordTranslate = flagStartGame.indexStart;
  } else {
    obj.numWord = flagStartGame.indexStart;
    obj.wordTranslate = flagStartGame.indexStart + 1;
  }
  flagStartGame.indexStart += 1;
  return obj;
}

export function replaceWord(arr: Array<IWords>) {
  try {
    const engWordSprint = document.querySelector(".eng-word-sprint");
    const ruWordSprint = document.querySelector(".ru-word-sprint");
    const count = getramdomWord();
    if (count) {
      if (engWordSprint) {
        engWordSprint.textContent = arr[count.numWord].word;
      }
      if (ruWordSprint) {
        ruWordSprint.textContent = arr[count.wordTranslate].wordTranslate;
      }
    }
  } catch {
    flagStartGame.indexStart = 0;
    const counterSprint = document.querySelector(".counter-sprint");
    if (counterSprint) {
      const resultSprint = counterSprint?.textContent;
      endGame(resultSprint, answerSprint);
    }
  }
}

function playAudioTimer() {
  //audio.src = 'https://vsezvuki.com/data/629-oplata-applepay-podtverzhdenie-v-appstore-iphone.mp3';
  audio.src =
    "https://vsezvuki.com/data/629-klaviatura-iphone-nabor-teksta.mp3";
  audio.currentTime = 0;
  audio.play();
}

export function sortArrayWords(array : Array<IWords> | Array<number>) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

import { difficultyLevel, arrWords } from "../scriptSprint";
import { createArrayWords } from "./requestAPI";
import { startGame } from "./content";
import { startTimer, flagStartGame, replaceWord } from "./function";
import { IanswerSprint } from "./interface";

const audio = new Audio();

export const answerSprint: IanswerSprint = {
  countErr: 0,
  countAnswer: 0,
  wordsAnswer: []
};
let countflag = -1;

export function startPageListener() {
  const levelWordsSprint = <HTMLSelectElement>(
    document.getElementById("level-words-sprint")
  );
  levelWordsSprint?.addEventListener("change", async () => {
    difficultyLevel.level = Number(levelWordsSprint.value);
    arrWords.splice(0, arrWords.length);
    arrWords.push(...(await createArrayWords(difficultyLevel.level)));
  });

  const btmStartSprint = document.querySelector(".btm-start-sprint");
  btmStartSprint?.addEventListener("click", () => {
    startGame(arrWords);
    startGameListener();
    setTimeout(startTimer, 1000);
  });
}

function startGameListener() {
  const buttonAnswer = document.querySelectorAll(".btn-answer"); 
  buttonAnswer.forEach((elem) => {
    elem.addEventListener("click", getGameListener);
  });
  window.addEventListener("keydown", getGameListenerKeydown);
}

export function getGameListener(event: Event) {
  const counterSprint = document.querySelector(".counter-sprint");
  const flagSprint = document.querySelectorAll(".flag-sprint");
  const valueCounterSprint = document.querySelector(".value-counter-sprint");
  const engWordSprint = document.querySelector(".eng-word-sprint");
  const separatorTrueAnswer = <HTMLElement>document.querySelector(".separator-true-answer");
  const separatorFalseAnswer = <HTMLElement>document.querySelector(".separator-false-answer");
  const additionalCounterSprint = <HTMLSelectElement>(
    document.querySelector(".additional-counter-sprint")
  ); 
  const engWordSprintNow = engWordSprint?.textContent;
  if ((event.target as HTMLElement)?.dataset.btn === flagStartGame.value) {
    playAudioCool()
    if (flagStartGame.value === 'true') {
      answerSprint.countAnswer += 1;
      if (engWordSprintNow) {
        answerSprint.wordsAnswer.push(engWordSprintNow);
      }
    }
    separatorTrueAnswer.style.display = "inline-block";
    setTimeout(() => {
      separatorTrueAnswer.style.display = "none";
    }, 500)
    if (counterSprint) {
      counterSprint.textContent = (
        Number(counterSprint.textContent) +
        10 +
        Number(valueCounterSprint?.textContent)
      ).toString();
    }
    if (countflag < 2) {
      countflag += 1;
      flagSprint[countflag].classList.add("active");
    } else if (countflag === 2) {
      flagSprint.forEach((elem) => elem.classList.remove("active"));
      countflag = -1;
      if (
        valueCounterSprint &&
        Number(valueCounterSprint.textContent) <= 60
      ) {
        valueCounterSprint.textContent = `${
          Number(valueCounterSprint.textContent) + 20
        }`;

      } else {
        const flag1 = <HTMLElement>flagSprint[0];
        const flag2 = <HTMLElement>flagSprint[1];
        const flag3 = <HTMLElement>flagSprint[2];
        flag1.style.display = "none";
        flag3.style.display = "none";
        flag2.classList.remove("active");
      }
      additionalCounterSprint.style.display = "block";
    }
  } else {
    playAudioError()
    separatorFalseAnswer.style.display = "inline-block";
    setTimeout(() => {
      separatorFalseAnswer.style.display = "none";
    }, 500)
    flagSprint.forEach((elem) => elem.classList.remove("active"));
    countflag = -1;
    answerSprint.countErr += 1;
  }
replaceWord(arrWords);
}

function playAudioError() {
  audio.src = 'https://vsezvuki.com/data/905-gudok-kak-pomekha.mp3';
  audio.currentTime = 0;
  audio.play();
}

function playAudioCool() {
  audio.src = 'https://vsezvuki.com/data/630-whatsapp-korotky-rington.mp3';
  audio.currentTime = 0;
  audio.play();
}

function getGameListenerKeydown(event: KeyboardEvent) {
  const counterSprint = document.querySelector(".counter-sprint");
  const flagSprint = document.querySelectorAll(".flag-sprint");
  const valueCounterSprint = document.querySelector(".value-counter-sprint");
  const engWordSprint = document.querySelector(".eng-word-sprint");
  const separatorTrueAnswer = <HTMLElement>document.querySelector(".separator-true-answer");
  const separatorFalseAnswer = <HTMLElement>document.querySelector(".separator-false-answer");
  const additionalCounterSprint = <HTMLSelectElement>(
    document.querySelector(".additional-counter-sprint")
  ); 
  const engWordSprintNow = engWordSprint?.textContent;

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    if ((event.key === 'ArrowRight' && flagStartGame.value === "true") || (event.key === 'ArrowLeft' && flagStartGame.value === "false") ) {
      console.log('true')
    playAudioCool()
    if (flagStartGame.value === 'true') {
      answerSprint.countAnswer += 1;
      if (engWordSprintNow) {
        answerSprint.wordsAnswer.push(engWordSprintNow);
      }
    }
    separatorTrueAnswer.style.display = "inline-block";
    setTimeout(() => {
      separatorTrueAnswer.style.display = "none";
    }, 500)
    if (counterSprint) {
      counterSprint.textContent = (
        Number(counterSprint.textContent) +
        10 +
        Number(valueCounterSprint?.textContent)
      ).toString();
    }
    if (countflag < 2) {
      countflag += 1;
      flagSprint[countflag].classList.add("active");
    } else if (countflag === 2) {
      flagSprint.forEach((elem) => elem.classList.remove("active"));
      countflag = -1;
      if (
        valueCounterSprint &&
        Number(valueCounterSprint.textContent) <= 60
      ) {
        valueCounterSprint.textContent = `${
          Number(valueCounterSprint.textContent) + 20
        }`;

      } else {
        const flag1 = <HTMLElement>flagSprint[0];
        const flag2 = <HTMLElement>flagSprint[1];
        const flag3 = <HTMLElement>flagSprint[2];
        flag1.style.display = "none";
        flag3.style.display = "none";
        flag2.classList.remove("active");
      }
      additionalCounterSprint.style.display = "block";
    }
  }

  if ((event.key === 'ArrowLeft' && flagStartGame.value === "true") || (event.key === 'ArrowRight' && flagStartGame.value === "false")) {
    console.log('false')
    playAudioError()
    separatorFalseAnswer.style.display = "inline-block";
    setTimeout(() => {
      separatorFalseAnswer.style.display = "none";
    }, 500)
    flagSprint.forEach((elem) => elem.classList.remove("active"));
    countflag = -1;
    answerSprint.countErr += 1;
  }

replaceWord(arrWords);
 }
}
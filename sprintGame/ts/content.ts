import { IWords, IanswerSprint } from "./interface";
import { getramdomWord } from "./function";

const root = document.querySelector('.root');

export const startPages = async () => {
  const html = `
<div class="container-wrapper">
  <div class="container-sprint">
    <h1 class="header-sprint">Спринт</h1>
    <div class="block-description">
      <p class="description-style">Мини-игра Спринит проверит на сколько хорошо ты знаешь переведо слов</p>
      <p class="description-style">Игра длится 1 минуту или пока не закончаться слова.</p>
      <p class="description-style">Чтобы сделать выбор, кликай мышью или клавишами  → / ←</p>
      <select class="description-style" id="level-words-sprint">
        <option value="0">Уровень 1</option>
        <option value="1">Уровень 2</option>
        <option value="2">Уровень 3</option>
        <option value="3">Уровень 4</option>
        <option value="4">Уровень 5</option>
        <option value="5">Уровень 6</option>
      </select>
    </div>
    <button class="btm-start-sprint">Старт</button>
  </div>
</div>
`;
  if(root) {
    root.innerHTML = html;
  }
};

//export const flagTrueFalse: IflagTrueFalse = {value: null};
export const startGame = async (arr: Array<IWords>) => {
  const count = getramdomWord();
  const html = `
<div class="container-start-game">
  <div class="timer">59</div>
  <div class="block-game-sprint">
    <div class="counter-sprint">0</div>
    <div class="container-flag-sprint">
      <div class="flag-sprint">✓</div>
      <div class="flag-sprint">✓</div>
      <div class="flag-sprint">✓</div>
    </div>
    <div class="additional-counter-sprint"><span>+ </span><span class="value-counter-sprint">0</span> очков<span></span></div>
    <p class="eng-word-sprint">${arr[count.numWord].word}</p>
    <p class="ru-word-sprint">${arr[count.wordTranslate].wordTranslate}</p>
    <div class="separator-block-sprint">
      <span>--------------------------------------------------------------------------</span>
      <div class="separator-true-answer">&#10003</div>
      <div class="separator-false-answer">&#10007</div>
    </div>
    <div class="button-answer-sprint">
      <button data-btn="false" class="btn-answer" id="falseSprint">Неверно</button>
      <button data-btn="true" class="btn-answer" id="trueSprint">Верно</button>
    </div>
  </div>
</div>
`;
  if(root) {
    root.innerHTML = html;
  }
};

export const endGame = async (result: string | null, countObj: IanswerSprint) => {
  let wordsAnswerBlock = ``;
  countObj.wordsAnswer.forEach(elem => {
    wordsAnswerBlock += `<div class="learn-word">${elem}</div>`
  })
  const html = `
  <div class="container-wrapper">
    <div class="container-end-game">
      <div class="header-result-sprint">Ваш результат</div>
      <div class="result-sprint">${result}</div>
      <div class="block-cont-result">
        <span class="error-answer-sprint">Количество ошибок: </span>
        <span class="count-error-sprint">${countObj.countErr}</span>
      </div>
      <div class="block-cont-result">
        <span class="error-answer-sprint">Выучено слов: </span>
        <span class="count-error-sprint">${countObj.countAnswer}</span>
      </div>
      <div class="words-answer-block">${wordsAnswerBlock}</div>
      <button class="btm-close-sprint">Закрыть</button>
    </div>
  </div>
`;
  if(root) {
    root.innerHTML = html;
  }
};

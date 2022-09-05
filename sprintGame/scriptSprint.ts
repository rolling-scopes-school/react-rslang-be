import "./style.css";
import { startPages } from "./ts/content";
import { startPageListener } from "./ts/listener";
import { createArrayWords } from "./ts/requestAPI";
import { IWords, IflagLevel } from "./ts/interface";
import { sortArrayWords } from "./ts/function";

export const difficultyLevel: IflagLevel = { level: 0 };
export const arrWords: Array<IWords> = [];

export function startGameSprint() {
  startPages();
  createArrayWords(difficultyLevel.level).then((res) => {
    arrWords.push(...res);
    sortArrayWords(arrWords);
  });
  startPageListener();
}
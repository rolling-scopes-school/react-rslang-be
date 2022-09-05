import { IWords } from "./interface";
import { sortArrayWords } from "./function";

const getWords = async (page: number, group: number) => {
  const wordsResponse = await fetch(
    `https://react-learnwords-184.herokuapp.com/words?page=${page}&group=${group}`
  );
  const words = await wordsResponse.json();
  return words;
};

export const createArrayWords = async (level: number) => {
  const arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  sortArrayWords(arrNum);
  const arrWords = [];
  for (let i = 0; i < 5; i++) {
    let words = (await getWords(arrNum[i], level)).map((elem: IWords) => {
      return { word: elem.word, wordTranslate: elem.wordTranslate };
    });
    arrWords.push(...words);
  }
  return arrWords;
};

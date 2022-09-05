export interface IWords {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export interface IRamdom {
  bool: boolean,
  numWord: number,
  wordTranslate: number
};

export interface IflagStartGame {
  value: string | null,
  indexStart: number
};

export interface IflagLevel {
  level: number
};

export interface IanswerSprint {
  countErr: number,
  countAnswer: number,
  wordsAnswer: Array<string>
};
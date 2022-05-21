import { useState } from 'react';
// @ts-ignore
import styles from './AnswerAndWord.module.scss';
import { BiShow } from 'react-icons/bi';
import { MdOutlineTranslate } from 'react-icons/md';
import { BiChevronsRight } from 'react-icons/bi';


interface Props {
  getWords: () => Array<any>;
}

const AnswerAndWord = (props: Props) => {
  const [translation, setTranslation] = useState('');

  //Get random object from "WORDS" array
  const getRandomObjFromArr = () => {
    return props.getWords()[
      Math.floor(Math.random() * props.getWords().length)
    ];
  };

  //Get result from function above and convert it into array or return "Empty" message
  const convertRandomObjToArr = () => {
    if (getRandomObjFromArr() === undefined) {
      return [['List is Empty', 0]];
    } else {
      let result = Object.entries(getRandomObjFromArr());
      return result;
    }
  };

  const [word, setWord] = useState<Array<any>>(convertRandomObjToArr());

  const showTranslation = () => {
    let answer = word[0][1];

    if (word[0][0] === 'List is Empty') {
      setTranslation('List is Empty');
    } else if (translation === '') {
      setTranslation(answer);
    } else if (translation !== '') {
      setTranslation('');
    }
  };

  const checkAnswerHandler = (event: any) => {
    event.preventDefault();
    let answer = event.target.answer.value.toLowerCase().trim();
    let translation = word[0][1].toLowerCase().trim();

    if (answer === translation) {
      setWord(convertRandomObjToArr());
      setTranslation('');
    }
    if (answer !== translation) {
    }
    event.target.answer.value = '';
  };

  return (
    <>
      <form onSubmit={checkAnswerHandler} className={styles.answerForm}>
        <input
          id="answer"
          className={styles.answer}
          autoComplete="off"
          placeholder="Answer"
        />
      </form>

      <BiChevronsRight className={styles.arrow} />

      <span className={styles.guessWord}>{word[0][0]}</span>
      <span className={styles.translation}>{translation}</span>
      <button
        className={styles.showTranslationBtn}
        type="button"
        onClick={showTranslation}
      >
        <BiShow />
        <MdOutlineTranslate />
      </button>
    </>
  );
};

export default AnswerAndWord;

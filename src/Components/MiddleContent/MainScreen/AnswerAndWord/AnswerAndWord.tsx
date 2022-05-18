import { useState } from 'react';
// @ts-ignore
import styles from './AnswerAndWord.module.scss';

const helloWords = [
  'Want some practice? Roger that.',
  "Let's get this done.",
  'Time to practice.',
  'Now, we are ready to start.',
  'Dedicating time to something productive.',
];

const getRandomHelloWord = () => {
  return helloWords[Math.floor(Math.random() * helloWords.length)];
};

interface Props {
  getWords: () => Array<any>;
}

const AnswerAndWord = (props: Props) => {
  const [answer, setAnswer] = useState(getRandomHelloWord());
  const [answerToggle, setAnswerToggle] = useState(true);

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
      setAnswer('List is Empty');
      setAnswerToggle(false);
    } else if (answerToggle) {
      setAnswerToggle(false);
      setAnswer(answer);
    } else if (!answerToggle) {
      setAnswerToggle(true);
      setAnswer('Continue');
    }
  };

  const checkAnswerHandler = (event: any) => {
    event.preventDefault();
    let answer = event.target.answer.value.toLowerCase().trim();
    let translation = word[0][1].toLowerCase().trim();

    if (answer === translation) {
      setAnswer('Correct!');
      setWord(convertRandomObjToArr());
    }
    if (answer !== translation) {
      setAnswer('Wrong!');
    }
    event.target.answer.value = '';
  };

  return (
    <>
      <div className={styles.message}>{answer}</div>
      <form onSubmit={checkAnswerHandler} className={styles.answerForm}>
        <input
          id="answer"
          className={styles.answer}
          autoComplete="off"
          placeholder="Answer"
        />
      </form>

      <p className={styles.guessWord}>{word[0][0]}</p>

      <button
        className={styles.showTranslationBtn}
        type="button"
        onClick={showTranslation}
      >
        translation
      </button>
    </>
  );
};

export default AnswerAndWord;

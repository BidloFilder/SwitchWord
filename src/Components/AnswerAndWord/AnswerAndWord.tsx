import { useState } from 'react';
// @ts-ignore
import styles from './AnswerAndWord.module.scss';

const helloWords = [
  'Want some practice? Roger that.',
  "Let's get this done.",
  "It's time to practice.",
  'Now, we are ready to start.',
  'Dedicating time to something productive.',
];

const getRandomWord = () => {
  return helloWords[Math.floor(Math.random() * helloWords.length)];
};

interface Props {
  getWords: () => Array<any>;
}

const AnswerAndWord = (props: Props) => {
  const [answer, setAnswer] = useState(getRandomWord());
  const [answerBtn, setAnswerBtn] = useState('Show Answer');

  //Get random object from WORDS array
  const getRandomObjFromArr = () => {
    return props.getWords()[
      Math.floor(Math.random() * props.getWords().length)
    ];
  };

  //Get result word from function above or return warning message
  const convertRandomObjToArr = () => {
    if (getRandomObjFromArr() === undefined) {
      return [
        <span style={{ color: '#1d1d1d', fontSize: '2.5rem', opacity: 0.8 }}>
          List is Empty
        </span>,
      ];
    } else {
      return Object.entries(getRandomObjFromArr())[
        Math.floor(Math.random() * Object.entries(getRandomObjFromArr).length)
      ];
    }
  };

  const [word, setWord] = useState<Array<any>>(convertRandomObjToArr());

  const showAnswer = () => {
    if (answerBtn === 'Show Answer') {
      setAnswerBtn(word[1]);
    } else {
      setAnswerBtn('Show Answer');
    }
  };

  const checkAnswerHandler = (event) => {
    event.preventDefault();
    let translation = event.target.translate;

    if (translation.value.toLowerCase().trim() === word[1].toLowerCase()) {
      setAnswer('Correct!');
      setWord(convertRandomObjToArr());

      setTimeout(() => {
        setAnswer('Keep it up');
      }, 1500);
    }
    if (translation.value.toLowerCase().trim() !== word[1].toLowerCase()) {
      setAnswer('Wrong!');

      setTimeout(() => {
        setAnswer('Try again');
      }, 1500);
    }
    translation.value = '';
    setAnswerBtn('Show Answer');
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={checkAnswerHandler}>
        <input
          id="translate"
          className={styles.answer}
          autoComplete="off"
          placeholder="Answer"
        />
      </form>
      <div className={styles.reaction}>{answer}</div>
      <button
        className={styles.showAnswerBtn}
        type="button"
        onClick={showAnswer}
      >
        {answerBtn}
      </button>
      <p className={styles.guessWord}>{word[0]}</p>
    </div>
  );
};

export default AnswerAndWord;

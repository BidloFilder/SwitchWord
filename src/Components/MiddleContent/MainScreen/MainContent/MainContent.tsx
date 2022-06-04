import { useEffect, useState } from 'react';
import styles from './MainContent.module.scss';
import { BiShow } from 'react-icons/bi';
import { MdOutlineTranslate } from 'react-icons/md';
import { BiChevronsRight } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface Props {
  getWords: () => Array<object>;
}

const answerAnimation = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 1,
      type: 'spring',
    },
  },
};

const arrowAnimation = {
  trueAnswer: {
    color: '#ffffff',
    x: [0, 40, 0],
    transition: {
      duration: 0.8,
    },
  },
  falseAnswer: {
    color: '#dc143c',
    x: [0, -40, 0],
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    color: '#555555',
    x: 0,
  },
  listIsEmpty: {
    color: '#dc143c',
  },
};

const wordAnimation = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 1,
      type: 'spring',
    },
  },
};

const AnswerAndWord = (props: Props) => {
  const [translation, setTranslation] = useState('');
  const [checkAnswer, setCheckAnswer] = useState('');
  const [listEmptyCheck, setlistEmptyCheck] = useState(true);
  const [translationListEmpty, setTranslationListEmpty] = useState(true);

  //Get random object from "WORDS" array
  const getRandomObjFromArr = () => {
    return props.getWords()[
      Math.floor(Math.random() * props.getWords().length)
    ];
  };

  //Get result from function above and convert it into array or return "List is Empty" message
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
      setCheckAnswer('trueAnswer');
      setTimeout(() => {
        setCheckAnswer('initial');
      }, 1000);
      setTranslation('');
    }
    if (answer !== translation) {
      setCheckAnswer('falseAnswer');
      setTimeout(() => {
        setCheckAnswer('initial');
      }, 1000);
    }
    event.target.answer.value = '';
  };

  useEffect(() => {
    if (word[0][0] === 'List is Empty') {
      setlistEmptyCheck(false);
      setCheckAnswer('listIsEmpty');
      setTranslationListEmpty(false);
    } else {
      setlistEmptyCheck(true);
    }
  });

  return (
    <>
      <motion.form
        variants={answerAnimation}
        initial="initial"
        animate="animate"
        onSubmit={checkAnswerHandler}
        className={styles.answerForm}
      >
        <motion.input
          id="answer"
          className={styles.answer}
          autoComplete="off"
          placeholder="Answer"
        />
      </motion.form>

      <motion.span
        variants={arrowAnimation}
        animate={checkAnswer}
        className={styles.arrow}
      >
        <BiChevronsRight style={{ alignSelf: 'center' }} />
      </motion.span>

      <motion.span
        variants={wordAnimation}
        initial="initial"
        animate="animate"
        className={listEmptyCheck ? styles.guessWord : styles.listIsEmpty}
      >
        {word[0][0]}
      </motion.span>

      <span
        className={
          translationListEmpty ? styles.translation : styles.translationEmpty
        }
      >
        {translation}
      </span>

      <motion.button
        whileHover={{ scale: 1.1, color: '#ffffff' }}
        transition={{ duration: 0.01 }}
        className={styles.showTranslationBtn}
        type="button"
        onClick={showTranslation}
      >
        <BiShow />
        <MdOutlineTranslate />
      </motion.button>
    </>
  );
};

export default AnswerAndWord;

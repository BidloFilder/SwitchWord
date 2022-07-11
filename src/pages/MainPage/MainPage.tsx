import { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import { BiChevronsRight } from 'react-icons/bi';
import { motion } from 'framer-motion';
import Answer from '../../components/Answer';
import TranslationButton from '../../components/TranslationButton';
import { wordAnimation, arrowAnimation, translationAnimation } from './MainPageAnimations'

interface Props {
  getWords: () => Array<object>;
}

const MainPage = (props: Props) => {
  const [translation, setTranslation] = useState('');
  const [arrowCheckAnimation, setArrowCheckAnimation] = useState('');
  const [listEmptyCheck, setlistEmptyCheck] = useState(true);
  const [translationIsEmpty, setTranslationIsEmpty] = useState(true);
  const [translationShowAnimation, setTranslationShowAnimation] = useState('initial')
  const [changeGuessWord, setChangeGuessWord] = useState('animate')

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
      setTranslationShowAnimation('show')
      setTranslationIsEmpty(false)
    } else if (translation === '') {
      setTranslationShowAnimation('show')
      setTranslation(answer);
    } else if (translation !== '') {
      setTranslationShowAnimation('initial')
      setTranslation('');
    }
  };

  const checkAnswerHandler = (event: any) => {
    event.preventDefault();
    let answer = event.target.answer.value.toLowerCase().trim();
    let translation = word[0][1].toLowerCase().trim();

    if (answer === translation) {
      setArrowCheckAnimation('trueAnswer');
      setChangeGuessWord('up')

      setTimeout(() => {
        setWord(convertRandomObjToArr());
        setChangeGuessWord('down')
      }, 300);

      setTimeout(() => {
        setChangeGuessWord('back')
      }, 500);

      setTimeout(() => {
        setArrowCheckAnimation('initial');
      }, 1000);
      setTranslation('');
    }
    if (answer !== translation) {
      setArrowCheckAnimation('falseAnswer');
      setTimeout(() => {
        setArrowCheckAnimation('initial');
      }, 1000);
    }
    event.target.answer.value = '';
  };

  useEffect(() => {
    if (word[0][0] === 'List is Empty') {
      setlistEmptyCheck(false);
      setArrowCheckAnimation('listIsEmpty');
    } else {
      setlistEmptyCheck(true);
    }
  });

  return (
    <>
      <Answer checkAnswerHandler={checkAnswerHandler} />

      <motion.span
        variants={arrowAnimation}
        animate={arrowCheckAnimation}
        className={styles['arrow']}
      >
        <BiChevronsRight style={{ alignSelf: 'center' }} />
      </motion.span>

      <motion.span
        variants={wordAnimation}
        initial="initial"
        animate={changeGuessWord}
        className={
          listEmptyCheck ? styles['guess-word'] : styles['list-is-empty']
        }
      >
        {word[0][0]}
      </motion.span>

      <motion.span
        variants={translationAnimation}
        animate={translationShowAnimation}
        className={
          translationIsEmpty
            ? styles['translation']
            : styles['translation-empty']
        }
      >
        {translation}
      </motion.span>

      <TranslationButton showTranslation={showTranslation} />
    </>
  );
};

export default MainPage;

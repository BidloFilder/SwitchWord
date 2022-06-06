import React, { useEffect, useState } from 'react';
import Word from './Words/Word';
import styles from './List.module.scss';
import OptionsInterface from './Options/Options';
import { motion } from 'framer-motion';

interface Props {
  deleteWords: (event: any) => Array<any>;
  addNewWords: (word: any, translation: any) => Array<object>;
  deleteAll: () => Array<any>;
}

const listEmptyWarningAnimation = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
};

const cardWrapperAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
      type: 'spring',
    },
  },
};

const List = (props: Props) => {
  const [showEmptyListWarning, setShowEmptyListWarning] = useState(false);

  const [listWords, setListWords] = useState(() => {
    const localData = localStorage.getItem('words');
    return localData ? JSON.parse(localData) : [];
  });

  const [filteredWords, setFilteredWords] = useState(listWords);

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(listWords));
  }, [listWords]);

  useEffect(() => {
    if (listWords.length === 0) {
      setShowEmptyListWarning(true);
    } else setShowEmptyListWarning(false);
  }, [listWords]);

  useEffect(() => {
    setFilteredWords(listWords);
  }, [listWords]);

  const passInputsValue = (event: any) => {
    event.preventDefault();

    const wordValue = event.target.word.value.trim();
    const translateValue = event.target.translation.value.trim();

    setListWords(
      props.addNewWords(
        wordValue.trim().charAt(0).toUpperCase() +
          wordValue.trim().slice(1).toLowerCase(),
        translateValue.trim().charAt(0).toUpperCase() +
          translateValue.trim().slice(1).toLowerCase()
      )
    );
    event.target.word.value = '';
    event.target.translation.value = '';
  };

  const deleteWord = (event: any) => {
    setListWords(props.deleteWords(event));
  };

  const deleteAll = () => {
    setListWords(props.deleteAll());
  };

  const filterWords = (event: any) => {
    const search = event.target.value.toLowerCase();
    if (search !== '') {
      let filteredValues = listWords.filter((item: any) => {
        return Object.keys(item)[0].toLowerCase().includes(search);
      });
      setFilteredWords(filteredValues);
    } else {
      setFilteredWords(listWords);
    }
  };

  return (
    <>
      <OptionsInterface
        filterCards={filterWords}
        deleteAll={deleteAll}
        passInputsValue={passInputsValue}
      />

      {showEmptyListWarning ? (
        <motion.span
          variants={listEmptyWarningAnimation}
          initial="initial"
          animate="animate"
          className={styles['list-empty-warning']}
        >
          List Is Empty
        </motion.span>
      ) : null}

      <motion.div
        className={styles['words-wrapper']}
        variants={cardWrapperAnimation}
        initial="initial"
        animate="animate"
      >
        <Word listOfWords={filteredWords} deleteWord={deleteWord} />
      </motion.div>
    </>
  );
};

export default List;

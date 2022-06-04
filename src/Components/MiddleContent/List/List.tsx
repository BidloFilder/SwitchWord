import React, { useEffect, useState } from 'react';
import Word from './Words/Word';
import styles from './List.module.scss';
import OptionsInterface from './Options/Options';
import { motion } from 'framer-motion';

interface Props {
  deleteWordsHandler: (event: any) => Array<any>;
  addNewWordsHandler: (word: any, translation: any) => Array<object>;
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

  const [listCards, setListCards] = useState(() => {
    const localData = localStorage.getItem('words');
    return localData ? JSON.parse(localData) : [];
  });

  const [filteredCards, setFilteredCards] = useState(listCards);

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(listCards));
  }, [listCards]);

  useEffect(() => {
    if (listCards.length === 0) {
      setShowEmptyListWarning(true);
    } else setShowEmptyListWarning(false);
  }, [listCards]);

  useEffect(() => {
    setFilteredCards(listCards);
  }, [listCards]);

  const passInputsValue = (event: any) => {
    event.preventDefault();

    const wordValue = event.target.word.value.trim();
    const translateValue = event.target.translation.value.trim();

    setListCards(
      props.addNewWordsHandler(
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
    setListCards(props.deleteWordsHandler(event));
  };

  const deleteAll = () => {
    setListCards(props.deleteAll());
  };

  const filterCards = (event: any) => {
    const search = event.target.value.toLowerCase();
    if (search !== '') {
      let filteredValues = listCards.filter((item: any) => {
        return Object.keys(item)[0].toLowerCase().includes(search);
      });
      setFilteredCards(filteredValues);
    } else {
      setFilteredCards(listCards);
    }
  };

  return (
    <>
      <OptionsInterface
        filterCards={filterCards}
        deleteAll={deleteAll}
        passInputsValue={passInputsValue}
      />

      {showEmptyListWarning ? (
        <motion.span
          variants={listEmptyWarningAnimation}
          initial="initial"
          animate="animate"
          className={styles.listEmptyWarning}
        >
          List Is Empty
        </motion.span>
      ) : null}

      <motion.div
        className={styles.wordsWrapper}
        variants={cardWrapperAnimation}
        initial="initial"
        animate="animate"
      >
        <Word listValue={filteredCards} deleteWord={deleteWord} />
      </motion.div>
    </>
  );
};

export default List;

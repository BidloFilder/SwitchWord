import React, { useEffect, useState } from 'react';
// @ts-ignore
import Lists from '../Cards/Card.tsx';
// @ts-ignore
import styles from './OptionsForCards.module.scss';

interface Props {
  deleteWordsHandler: (event: any) => void;
  addNewWordsHandler: (word: any, translation: any) => Array<any>;
  deleteAll: () => Array<any>;
}

const OptionsForCards = (props: Props) => {
  const [showEmptyListWarning, setShowEmptyListWarning] = useState(false);
  const [wordWarning, setWordWarning] = useState(false);
  const [translationWarning, setTranslationWarning] = useState(false);

  const [listCards, setListCards] = useState(() => {
    const localData = localStorage.getItem('words');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(listCards));
  }, [listCards]);

  useEffect(() => {
    if (listCards.length === 0) {
      setShowEmptyListWarning(true);
    } else setShowEmptyListWarning(false);
  }, [listCards]);

  const passInputsValue = (event: any) => {
    event.preventDefault();

    const wordValue = event.target.word.value.trim();
    const translateValue = event.target.translation.value.trim();

    if (wordWarning === true || translationWarning === true) {
      return undefined;
    } else if (wordValue === '' || translateValue === '') {
      setWordWarning(true);
      setTranslationWarning(true);
    } else {
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
    }
  };

  const translationIsValid = (event: any) => {
    if (!isNaN(event.target.value.trim())) {
      setTranslationWarning(true);
    } else setTranslationWarning(false);
  };

  const wordIsValid = (event: any) => {
    if (!isNaN(event.target.value.trim())) {
      setWordWarning(true);
    } else setWordWarning(false);
  };

  const deleteWord = (event: any) => {
    setListCards(props.deleteWordsHandler(event));
  };

  const deleteAll = () => {
    setListCards(props.deleteAll());
  };

  return (
    <div className={styles.optionsAndCards}>
      <form onSubmit={passInputsValue} autoComplete="off">
        <input
          id="word"
          placeholder="Word"
          className={wordWarning ? styles.wordWarning : null}
          onChange={wordIsValid}
        />
        <button className={styles.addBtn} type="submit"></button>
        <input
          id="translation"
          placeholder="Translation"
          className={translationWarning ? styles.translationWarning : null}
          onChange={translationIsValid}
        />
      </form>

      <button onClick={deleteAll} className={styles.deleteAll}>
        Delete All
      </button>

      {showEmptyListWarning ? (
        <span className={styles.listEmptyWarning}>List Is Empty</span>
      ) : null}

      <Lists listValue={listCards} deleteWord={deleteWord} />
    </div>
  );
};

export default OptionsForCards;

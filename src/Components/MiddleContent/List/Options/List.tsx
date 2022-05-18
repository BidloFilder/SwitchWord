import React, { useEffect, useState } from 'react';
// @ts-ignore
import Card from '../Cards/Card.tsx';
// @ts-ignore
import styles from './List.module.scss';
// @ts-ignore
import Options from './Options.tsx';

interface Props {
  deleteWordsHandler: (event: any) => void;
  addNewWordsHandler: (word: any, translation: any) => Array<any>;
  deleteAll: () => Array<any>;
}

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
        translateValue.trim().slice(1).toLowerCase(),
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
      let filteredValues = listCards.filter((item: object) => {
        return Object.keys(item)[0].toLowerCase().includes(search);
      });
      setFilteredCards(filteredValues);
    } else {
      setFilteredCards(listCards);
    }
  };

  return (
    <>
      <Options
        filterCards={filterCards}
        deleteAll={deleteAll}
        passInputsValue={passInputsValue}
      />

      {showEmptyListWarning ? (
        <span className={styles.listEmptyWarning}>List Is Empty</span>
      ) : null}

      <div className={styles.cardWrapper}>
        <Card listValue={filteredCards} deleteWord={deleteWord} />
      </div>
    </>
  );
};

export default List;

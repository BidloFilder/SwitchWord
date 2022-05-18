// @ts-ignore
import styles from './App.module.scss';
// @ts-ignore
import AnswerAndWord from './Components/MiddleContent/MainScreen/AnswerAndWord/AnswerAndWord.tsx';
// @ts-ignore
import MainButton from './Components/TopContent/MainButton.tsx';
// @ts-ignore
import OptionsForCards from './Components/MiddleContent/List/Options/List.tsx';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

let WORDS = [];
WORDS = JSON.parse(localStorage.getItem('words'));

function App() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [showLists, setShowLists] = useState(false);

  const showAndHideHandler = (showList: boolean) => {
    if (!showList) {
      setShowTranslate(false);
      setShowLists(true);
    } else if (showList) {
      setShowTranslate(true);
      setShowLists(false);
    }
  };

  const addNewWordsHandler = (word: string, translation: string) => {
    let object = { [word]: translation, id: uuidv4() };
    WORDS = [object, ...WORDS];
    return WORDS;
  };

  const deleteWordsHandler = (event: any) => {
    let id = event.target.parentNode.id;

    WORDS = WORDS.filter(
      // @ts-ignore
      (item: object) => item.id !== id
    );
    return WORDS;
  };

  const deleteAll = () => {
    WORDS = [];
    return WORDS;
  };

  const getWords = () => {
    if (WORDS == null) {
      return [];
    } else return WORDS;
  };

  return (
    <div className={styles.mainBox}>
      <div className={styles.innerBox}>
        <div className={styles.topBox}>
          <span className={styles.logo}>SwitchWord.</span>
          <MainButton showAndHideHandler={showAndHideHandler} />
        </div>

        {showTranslate ? (
          <div className={styles.middleBox}>
            <AnswerAndWord getWords={getWords} />
          </div>
        ) : null}

        {showLists ? (
          <div className={styles.cardsBox}>
            <OptionsForCards
              deleteWordsHandler={deleteWordsHandler}
              addNewWordsHandler={addNewWordsHandler}
              deleteAll={deleteAll}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

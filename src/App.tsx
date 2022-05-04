// @ts-ignore
import styles from './App.module.scss';
// @ts-ignore
import AnswerAndWord from './Components/AnswerAndWord/AnswerAndWord.tsx';
// @ts-ignore
import MainButton from './Components/MainButton/MainButton.tsx';
// @ts-ignore
import OptionsForCards from './Components/Options/OptionsForCards.tsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

let WORDS = [];

function App() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [showLists, setShowLists] = useState(false);

  useEffect(() => {
    WORDS = JSON.parse(localStorage.getItem('words'));
  });

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
    <div>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>SwitchWord.</div>
        <MainButton showAndHideHandler={showAndHideHandler} />
      </div>
      <>
        {showLists ? (
          <OptionsForCards
            deleteWordsHandler={deleteWordsHandler}
            addNewWordsHandler={addNewWordsHandler}
            deleteAll={deleteAll}
          />
        ) : null}
      </>
      <>{showTranslate ? <AnswerAndWord getWords={getWords} /> : null}</>
    </div>
  );
}

export default App;

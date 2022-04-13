import './App.css';
import AnswerAndWord from './Components/AnswerAndWord/AnswerAndWord';
import MainButton from './Components/MainButton/MainButton';
import Inputs from './Components/InputsAndLists/Inputs/Inputs';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react/cjs/react.production.min';

let WORDS = [];

function App() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [showLists, setShowLists] = useState(false);
  
  const localData = localStorage.getItem('words');
  WORDS = JSON.parse(localData);

  const showAndHideHandler = (showList) => {
    if (!showList) {
      setShowTranslate(false);
      setShowLists(true);
    } else if (showList) {
      setShowTranslate(true);
      setShowLists(false);
    }
  };

  const addNewWordsHandler = (word, translation) => {
    let object = { [word]: translation, id: uuidv4() };
    WORDS = [object, ...WORDS];
    return WORDS;
  };

  const deleteWordsHandler = (event) => {
    //Delete from list
    let word = event.target.previousSibling.innerText;
    let translation = event.target.nextSibling.innerText;
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);

    //Delete from localStorage
    let storageWords = JSON.parse(localStorage.getItem('words'));
    storageWords = storageWords.filter((item) => item[word] !== translation);
    storageWords = JSON.stringify(storageWords);
    localStorage.setItem('words', storageWords);
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
    <Fragment>
      <div className="logo_wrapper">
        <div className="logo">SwitchWord</div>
        <MainButton showAndHide={showAndHideHandler} />
      </div>
      <>
        {showLists ? (
          <Inputs
            deleteWord={deleteWordsHandler}
            addWord={addNewWordsHandler}
            deleteAll={deleteAll}
          />
        ) : null}
      </>
      <>{showTranslate ? <AnswerAndWord getWords={getWords} /> : null}</>
    </Fragment>
  );
}

export default App;

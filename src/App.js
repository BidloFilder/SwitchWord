import './App.css';
import AnswerAndWord from './Components/AnswerAndWord/AnswerAndWord';
import MainButton from './Components/MainButton/MainButton';
import Inputs from './Components/InputsAndLists/Inputs/Inputs';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    let word = event.target.previousSibling.innerText;
    let translation = event.target.nextSibling.innerText;
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);

    let storageWords = JSON.parse(localStorage.getItem('words'));
    storageWords = storageWords.filter((item) => item[word] !== translation);
    storageWords = JSON.stringify(storageWords);
    localStorage.setItem('words', storageWords);
  };

  const deleteAll = () => {
    WORDS = [];
    return WORDS;
  };

  return (
    <div>
      <div className="main_button">
        <MainButton showAndHide={showAndHideHandler} />
      </div>
      <div className="lists">
        {showLists ? (
          <Inputs
            deleteWord={deleteWordsHandler}
            addWord={addNewWordsHandler}
            deleteAll={deleteAll}
          />
        ) : null}
      </div>
      <div>{showTranslate ? <AnswerAndWord getWords={WORDS} /> : null}</div>
    </div>
  );
}

export default App;

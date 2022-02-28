import './App.css';
import TranslateAndResult from './Components/TranslateAndResult/TranslateAndResult';
import MainButton from './Components/MainButton/MainButton';
import InputsAndLists from './Components/InputsAndLists/InputsAndLists';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

let WORDS = [];

function App() {
  const [showTranslate, setShowTranslate] = useState(true);
  const [showLists, setShowLists] = useState(false);

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
    if ((word, translation === undefined)) {
      return WORDS;
    }
    let object = { [word]: translation, id: uuidv4() };
    WORDS = [object, ...WORDS];
    return WORDS;
  };

  const deleteWordsHandler = (event) => {
    let word = event.target.previousSibling.innerText;
    let translation = event.target.nextSibling.innerText;
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    WORDS = WORDS.filter((item) => item[word] !== translation);
    return WORDS;
  };

  return (
    <div>
      <div className="main_button">
        <MainButton showAndHide={showAndHideHandler} />
      </div>
      <div className="lists">
        {showLists ? (
          <InputsAndLists
            deleteWord={deleteWordsHandler}
            addWord={addNewWordsHandler}
          /> ) : null}
      </div>
      <div>
        {showTranslate ? <TranslateAndResult getWords={WORDS} /> : null}
      </div>
    </div>
  );
}

export default App;

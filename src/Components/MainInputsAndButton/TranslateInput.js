import { useState } from 'react';
import './TranslateInput.css';
import WordsList from '../WordsLists/InputsAndLists';
import WordsListButton from './WordsListButton';
import '../WordsLists/InputsAndLists.css'

const TranslateInput = (props) => {
  const [word, setWord] = useState(props.words);
  const [showInput, setShowInput] = useState(false);
  const [resultStyle, setResultStyle] = useState(false);
  const [inputStyle, setInputStyle] = useState(false);
  const [list, setList] = useState('');

  const changeWordHandler = (event) => {
    event.preventDefault();

    if (event.target.translate.value.toLowerCase() === word[1]) {
      console.log("You're god damn right");
      setWord(props.words);
    }
    if (event.target.translate.value.toLowerCase() !== word[1]) {
      console.log("It's wrong you dumbass");
    }
    event.target.translate.value = '';
  };

  const showList = (showListState) => {
    if (!showListState) {
      setWord('');
      setList(<WordsList />);
      setResultStyle(true);
      setInputStyle(true);
      setShowInput(true);
    } else if (showListState) {
      setWord(props.words);
      setList('');
      setResultStyle(false);
      setInputStyle(false);
      setShowInput(false);
    }
  };

  return (
    <div className="box">
      <div className='list_and_button'>
        <WordsListButton onShowWord={showList} />
        <div>{list}</div>
      </div>

      <form onSubmit={changeWordHandler}>
        <input
          id="translate"
          className={!inputStyle ? 'input' : null}
          maxLength={20}
          autoComplete="off"
          type={showInput ? 'hidden' : null}
        />
      </form>

      <p className={!resultStyle ? 'result' : null}>{word[0]}</p>
    </div>
  );
};

export default TranslateInput;

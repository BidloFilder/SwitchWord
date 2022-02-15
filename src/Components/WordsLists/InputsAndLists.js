import React, { useState } from 'react';
import List from './List';
import './InputsAndLists.css';

const WordsList = () => {
  const [wordInput, setWordInput] = useState('');
  const [translateInput, setTranslateInput] = useState('');
  const [listValue, setListValue] = useState('')

  const wordInputHandler = (event) => {
    setWordInput(event.target.value);
  };

  const translateInputHandler = (event) => {
    setTranslateInput(event.target.value);
  };

  const sendInputsValue = (event) => {
     event.preventDefault();
     setListValue(<List wordValue={wordInput} inputValue={translateInput} />)
  };

  return (
    <div className="words_list_box">
      
      <form onSubmit={sendInputsValue}>
        <label>
          Word:
          <input value={wordInput} onChange={wordInputHandler} />
        </label>

        <button type="submit">Add Word</button>

        <label>
          Translation:
          <input value={translateInput} onChange={translateInputHandler} />
        </label>
      </form>

      <div>{listValue}</div>
    </div>
  );
};

export default WordsList;

import React, { useState } from 'react';
import Lists from '../Lists/Lists';
import './Inputs.css';

const Inputs = (props) => {
  const [listValue, setListValue] = useState(props.addWord);
  const [wordWarning, setWordWarning] = useState(false);
  const [translationWarning, setTranslationWarning] = useState(false);

  const passInputsValue = (event) => {
    event.preventDefault();
    let wordValue = event.target.word.value;
    let translateValue = event.target.translation.value;

    if (wordValue === '' || !isNaN(wordValue)) {
      setWordWarning(true);
      setTranslationWarning(true);
    } else if (translateValue === '' || !isNaN(translateValue)) {
      setWordWarning(true);
      setTranslationWarning(true);
    } else {
      setWordWarning(false);
      setTranslationWarning(false);

      setListValue(
        props.addWord(
          wordValue.charAt(0).toUpperCase() + wordValue.slice(1).toLowerCase(),
          translateValue.charAt(0).toUpperCase() +
            translateValue.slice(1).toLowerCase()
        )
      );
      event.target.word.value = '';
      event.target.translation.value = '';
    }
  };

  const deleteAll = () => {
    setListValue([]);
    props.deleteAll();
  };

  return (
    <div className="words_list_box">
      <span className='logo'>SwitchWord</span>
      <form onSubmit={passInputsValue} autoComplete="off" className="list_form">
        <label>
          Word
          <input id="word" className={wordWarning ? 'word_warning' : null} />
        </label>

        <button className="add_btn" type="submit">
          Add Word
        </button>
        <button onClick={deleteAll} className="delete_all">
          Delete All
        </button>

        <label>
          Translation
          <input
            id="translation"
            className={translationWarning ? 'translation_warning' : null}
          />
        </label>
      </form>

     <Lists listValue={listValue} deleteWord={props.deleteWord}/>
    </div>
  );
};

export default Inputs;

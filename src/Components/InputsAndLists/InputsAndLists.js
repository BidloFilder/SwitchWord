import React, { useState } from 'react';
import './InputsAndLists.css';

const InputsAndLists = (props) => {
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
          wordValue.charAt(0).toUpperCase() +
          wordValue.slice(1).toLowerCase(),
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
      <form onSubmit={passInputsValue} autoComplete="off" className="list_form">
        <label>
          Word
          <input id="word" className={wordWarning ? 'word_warning' : null} />
        </label>

        <button className="add_btn" type="submit">
          Add Word
        </button>
        <button onClick={deleteAll} className='delete_all'>Delete All</button>

        <label>
          Translation
          <input
            id="translation"
            className={translationWarning ? 'translation_warning' : null}
          />
        </label>
      </form>

      <div className="list_items">
        {listValue.map((value) => {
          return (
            <div key={value.id}>
              <div className="item">
                <p>
                  {Object.keys(value)[0].charAt(0).toUpperCase() +
                    Object.keys(value)[0].slice(1).toLowerCase()}
                </p>
                <button
                  className="delete_btn"
                  onClick={props.deleteWord}
                  type="button"
                >
                  Delete
                </button>
                <p style={{ fontWeight: '400' }}>
                  {Object.values(value)[0].charAt(0).toUpperCase() +
                    Object.values(value)[0].slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputsAndLists;

import React, { useEffect, useState } from 'react';
import Lists from '../Lists/Lists';
import './Inputs.css';

const Inputs = (props) => {
  const [showEmptyListWarning, setShowEmptyListWarning] = useState(false);
  const [wordWarning, setWordWarning] = useState(false);
  const [translationWarning, setTranslationWarning] = useState(false);
  const [listValue, setListValue] = useState(() => {
    const localData = localStorage.getItem('words');
    return localData ? JSON.parse(localData) : [];
  }, props.addWord);

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(listValue));
  }, [listValue]);

  useEffect(() => {
    if (listValue.length === 0) {
      setShowEmptyListWarning(true);
    } else setShowEmptyListWarning(false);
  }, [listValue]);

  const passInputsValue = (event) => {
    event.preventDefault();

    let wordValue = event.target.word.value;
    let translateValue = event.target.translation.value;

    if (wordWarning || translationWarning === true) {
      return undefined;
    } else if ((wordValue, translateValue === '')) {
      setWordWarning(true);
      setTranslationWarning(true);
    } else {
      setListValue(
        props.addWord(
          wordValue.trim().charAt(0).toUpperCase() +
          wordValue.trim().slice(1).toLowerCase(),
          translateValue.trim().charAt(0).toUpperCase() +
          translateValue.trim().slice(1).toLowerCase()
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

  const translationIsValid = (event) => {
    if (!isNaN(event.target.value)) {
      setTranslationWarning(true);
    } else setTranslationWarning(false);
  };

  const wordIsValid = (event) => {
    if (!isNaN(event.target.value)) {
      setWordWarning(true);
    } else setWordWarning(false);
  };

  return (
    <div className="words_list_box">
      <form onSubmit={passInputsValue} autoComplete="off" className="list_form">
        <input
          id="word"
          placeholder="Word"
          className={wordWarning ? 'word_warning' : null}
          onChange={wordIsValid}
        />
        <button className="add_btn" type="submit">
          Add Word
        </button>
        <input
          id="translation"
          placeholder="Translation"
          className={translationWarning ? 'translation_warning' : null}
          onChange={translationIsValid}
        />
      </form>

      <button onClick={deleteAll} className="delete_all">
        Delete All
      </button>
      
      {showEmptyListWarning ? (
        <span className="list_is_empty">List Is Empty</span>
      ) : null}

      <Lists listValue={listValue} deleteWord={props.deleteWord} />
    </div>
  );
};

export default Inputs;

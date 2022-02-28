import React, { useState } from 'react';
import './InputsAndLists.css';

const InputsAndLists = (props) => {
  const [listValue, setListValue] = useState(props.addWord);

  const passInputsValue = (event) => {
    event.preventDefault();
    let wordValue = event.target.word.value;
    let translateValue = event.target.translation.value;

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
  };

  return (
    <div className="words_list_box">
      <form onSubmit={passInputsValue} autoComplete="off" className="list_form">
        <label>
          Word
          <input id="word" />
        </label>

        <button className="add_btn" type="submit">
          Add Word
        </button>

        <label>
          Translation
          <input id="translation" />
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

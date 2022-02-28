import { useState } from 'react';
import './TranslateAndResult.css';
import '../InputsAndLists/InputsAndLists.css';

const TranslateAndResult = (props) => {
  
  //Get random object from WORDS array
  const getRandomObjFromArr = () => {
    return props.getWords[Math.floor(Math.random() * props.getWords.length)];
  };

  //Get result word from function above or return warning message
  const convertRandomObjToArr = () => {
    if (getRandomObjFromArr() === undefined) {
      const inlineErrorStyle = {
        color: 'crimson',
        fontSize: '2rem',
        borderLeft: '4px solid crimson',
        borderRight: '4px solid crimson',
        padding: '.65rem 2rem',
        opacity: 1,
      };
      return [<span style={inlineErrorStyle}>The List is Empty</span>];
    } else {
      return Object.entries(getRandomObjFromArr())[
        Math.floor(Math.random() * Object.entries(getRandomObjFromArr).length)
      ];
    }
  };

  const [word, setWord] = useState(convertRandomObjToArr());

  const changeWordHandler = (event) => {
    event.preventDefault();
    let translation = event.target.translate;

    if (translation.value.toLowerCase() === word[1].toLowerCase()) {
      console.log("You're god damn right");
      setWord(convertRandomObjToArr());
    }
    if (translation.value.toLowerCase() !== word[1].toLowerCase()) {
      console.log("It's wrong you dumbass");
    }
    translation.value = '';
  };

  return (
    <div className="box">
      <form onSubmit={changeWordHandler}>
        <input
          id="translate"
          className="input"
          maxLength={30}
          autoComplete="off"
        />
      </form>
      <p className="result">{word[0]}</p>
    </div>
  );
};

export default TranslateAndResult;

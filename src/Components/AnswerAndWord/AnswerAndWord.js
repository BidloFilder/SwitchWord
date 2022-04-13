import { useState, useEffect } from 'react';
import './AnswerAndWord.css';

const AnswerAndWord = (props) => {
  const [answer, setAnswer] = useState('Want some practice? Roger that.');
  const [answerBtn, setAnswerBtn] = useState('Show Answer');

  //Get random object from WORDS array
  const getRandomObjFromArr = () => {
    return props.getWords()[
      Math.floor(Math.random() * props.getWords().length)
    ];
  };

  //Get result word from function above or return warning message
  const convertRandomObjToArr = () => {
    if (getRandomObjFromArr() === undefined) {
      const inlineErrorStyle = {
        color: '#1d1d1d',
        fontSize: '2.5rem',
        opacity: 0.8,
      };
      return [<span style={inlineErrorStyle}>List is Empty</span>];
    } else {
      return Object.entries(getRandomObjFromArr())[
        Math.floor(Math.random() * Object.entries(getRandomObjFromArr).length)
      ];
    }
  };

  const [word, setWord] = useState(convertRandomObjToArr());

  const showAnswer = () => {
    if (answerBtn === 'Show Answer') {
      setAnswerBtn(word[1]);
    } else {
      setAnswerBtn('Show Answer');
    }
  };

  const checkWordHandler = (event) => {
    event.preventDefault();
    let translation = event.target.translate;

    if (translation.value.toLowerCase() === word[1].toLowerCase()) {
      setAnswer('Correct!');
      setWord(convertRandomObjToArr());

      setTimeout(() => {
        setAnswer('Keep it up');
      }, 1500);
    }
    if (translation.value.toLowerCase() !== word[1].toLowerCase()) {
      setAnswer('Wrong!');

      setTimeout(() => {
        setAnswer('Try again');
      }, 1500);
    }
    translation.value = '';
    setAnswerBtn('Show Answer');
  };

  return (
    <div className="box">
      <form onSubmit={checkWordHandler}>
        <input
          id="translate"
          className="input"
          maxLength={40}
          autoComplete="off"
          placeholder="Answer"
        />
      </form>
      <div className="answer">{answer}</div>
      <button className="show_answer" type="button" onClick={showAnswer}>
        {answerBtn}
      </button>
      <p className="result">{word[0]}</p>
    </div>
  );
};

export default AnswerAndWord;

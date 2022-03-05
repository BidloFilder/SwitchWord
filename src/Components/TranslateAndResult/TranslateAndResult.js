import { useState } from 'react';
import './TranslateAndResult.css';

const TranslateAndResult = (props) => {
  const [answer, setAnswer] = useState('')
  const [answerBtn, setAnswerBtn] = useState('Show Answer')

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
        padding: '.65rem 1rem',
        width: '260px',
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
      setAnswer('Correct!')
      setWord(convertRandomObjToArr());
    }
    if (translation.value.toLowerCase() !== word[1].toLowerCase()) {
      setAnswer('Wrong!')
    }
    translation.value = '';
  };

  const showAnswer = () => {
    if (answerBtn === 'Show Answer') {
      setAnswerBtn(word[1])
    } else {
      setAnswerBtn('Show Answer')
    } 
  }

  return (
    <div className="box">
      <span className='logo'>SwitchWord</span>
      <form onSubmit={changeWordHandler}>
        <input
          id="translate"
          className="input"
          maxLength={40}
          autoComplete="off"
          placeholder='Answer'
        />
        <span className='answer'>{answer}</span>
        <button type="submit" className="check_btn">
          Check
        </button>
        <button className='show_answer' type='button' onClick={showAnswer}>
          {answerBtn}
        </button>
      </form>  
        <p className="result">{word[0]}</p> 
    </div>
  );
};

export default TranslateAndResult;

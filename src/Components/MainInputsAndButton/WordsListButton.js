import { useState } from 'react';
import './WordsListButton.css';

const WordsListButton = (props) => {
    
  const [showList, setShowList] = useState(false);
  const [showWord, setShowWord] = useState('Show List');

  const openWordsList = () => {
    if (!showList) {
      setShowList(true);
      setShowWord('Hide List');
      props.onShowWord(showList);
    } else if (showList) {
      setShowList(false);
      setShowWord('Show List');
      props.onShowWord(showList);
    }
  };

  return (
    <button onClick={openWordsList} className="words_list_btn">
      {showWord}
    </button>
  );
};

export default WordsListButton;

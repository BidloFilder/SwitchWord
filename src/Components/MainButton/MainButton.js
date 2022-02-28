import { useState } from 'react';
import './MainButton.css';

const MainButton = (props) => {
  const [showList, setShowList] = useState(false);
  const [showWord, setShowWord] = useState('List');

  const openWordsList = () => {
    if (!showList) {
      setShowList(true);
      setShowWord('Back');
      props.showAndHide(showList);
    } else if (showList) {
      setShowList(false);
      setShowWord('List');
      props.showAndHide(showList);
    }
  };

  return (
    <button onClick={openWordsList} className="words_list_btn">
      {showWord}
    </button>
  );
};

export default MainButton;

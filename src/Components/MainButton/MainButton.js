import { useState } from 'react';
import styles from './MainButton.module.scss';


const MainButton = (props) => {
  
  const [showList, setShowList] = useState(false);
  const [showWord, setShowWord] = useState('List');

  const openWordsList = () => {
    if (!showList) {
      setShowList(true);
      setShowWord('Main');
      props.showAndHide(showList);
    } else if (showList) {
      setShowList(false);
      setShowWord('List');
      props.showAndHide(showList);
    }
  };

  return (
    <button onClick={openWordsList} className={styles.mainButton}>
      {showWord}
    </button>
  );
};

export default MainButton;

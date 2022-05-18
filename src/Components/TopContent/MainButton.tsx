import { useState } from 'react';
// @ts-ignore
import styles from './MainButton.module.scss';

interface Props {
  showAndHideHandler: (showList: boolean) => undefined;
}

const MainButton = (props: Props) => {
  const [showList, setShowList] = useState(false);
  const [showWord, setShowWord] = useState('List');

  const openWordsList = () => {
    if (!showList) {
      setShowList(true);
      setShowWord('Main');
      props.showAndHideHandler(showList);
    } else if (showList) {
      setShowList(false);
      setShowWord('List');
      props.showAndHideHandler(showList);
    }
  };

  return (
    <button onClick={openWordsList} className={styles.mainButton}>
      {showWord}
    </button>
  );
};

export default MainButton;

import styles from './Word.module.scss';
import { FiDelete } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { wordAnimation } from './WordAnimations'

interface Props {
  listOfWords: any;
  deleteWord: (event: any) => void;
}

const Word = (props: Props) => {
  return (
    <motion.div
      variants={wordAnimation}
      initial="initial"
      animate="animate"
      id={props.listOfWords.id}
      className={styles['item']}
    >
      <span className={styles['word']}>
        {Object.keys(props.listOfWords)[0].charAt(0).toUpperCase() +
          Object.keys(props.listOfWords)[0].slice(1).toLowerCase()}
      </span>

      <FiDelete
        type="button"
        onClick={props.deleteWord}
        className={styles['delete-word-button']}
      />

      <span className={styles['translation']}>
        {  //@ts-ignore
          Object.values(props.listOfWords)[0].charAt(0).toUpperCase() +
          //@ts-ignore
          Object.values(props.listOfWords)[0].slice(1).toLowerCase()}
      </span>
    </motion.div>
  );
};

export default Word;

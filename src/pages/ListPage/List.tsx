import { useEffect, useState } from 'react';
import Word from './Word';
import styles from './List.module.scss';
import { motion } from 'framer-motion';
import Search from '../../components/Search';
import AddWord from '../../components/AddWord';
import DeleteAll from '../../components/DeleteAll';
import { listEmptyWarningAnimation, wordWrapperAnimation } from './ListAnimations'

interface Props {
  deleteWords: (event: any) => Array<any>;
  addNewWords: (word: any, translation: any) => Array<object>;
  deleteAll: () => Array<any>;
}

const List = (props: Props) => {
  const [showEmptyListWarning, setShowEmptyListWarning] = useState(false);

  const [listWords, setListWords] = useState(() => {
    const localData = localStorage.getItem('words');
    return localData ? JSON.parse(localData) : [];
  });

  const [filteredWords, setFilteredWords] = useState(listWords);

  //save array
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(listWords));
  }, [listWords]);

  //check if array of words is empty
  useEffect(() => {
    if (listWords.length === 0) {
      setShowEmptyListWarning(true);
    } else setShowEmptyListWarning(false);
  }, [listWords]);

  //set filtered words
  useEffect(() => {
    setFilteredWords(listWords);
  }, [listWords]);

  const passInputsValue = (event: any) => {
    event.preventDefault();

    const wordValue = event.target.word.value.trim();
    const translateValue = event.target.translation.value.trim();

    setListWords(
      props.addNewWords(
        wordValue.trim().charAt(0).toUpperCase() +
        wordValue.trim().slice(1).toLowerCase(),
        translateValue.trim().charAt(0).toUpperCase() +
        translateValue.trim().slice(1).toLowerCase()
      )
    );
    event.target.word.value = '';
    event.target.translation.value = '';
  };

  const deleteWord = (event: any) => {
    setListWords(props.deleteWords(event));
  };

  const deleteAll = () => {
    setListWords(props.deleteAll());
  };

  const filterWords = (event: any) => {
    const search = event.target.value.toLowerCase();
    if (search !== '') {
      let filteredValues = listWords.filter((item: any) => {
        return Object.keys(item)[0].toLowerCase().includes(search);
      });
      setFilteredWords(filteredValues);
    } else {
      setFilteredWords(listWords);
    }
  };

  return (
    <>
      <div className={styles['options']}>
        <AddWord passInputsValue={passInputsValue} />
        <Search filterWords={filterWords} />
        <DeleteAll deleteAll={deleteAll} />
      </div>

      {showEmptyListWarning ? (
        <motion.span
          variants={listEmptyWarningAnimation}
          initial="initial"
          animate="animate"
          className={styles['list-empty-warning']}
        >
          List Is Empty
        </motion.span>
      ) : null}

      <motion.div
        className={styles['words-wrapper']}
        variants={wordWrapperAnimation}
        initial="initial"
        animate="animate"
      >
        {filteredWords.map((word: any) => {
          return <Word key={word.id} listOfWords={word} deleteWord={deleteWord} />
        })}
      </motion.div>
    </>
  );
};

export default List;

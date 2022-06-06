import React, { useState } from 'react';
import styles from './Options.module.scss';
import { RiAddFill } from 'react-icons/ri';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { motion } from 'framer-motion';

interface Props {
  filterCards: (event: any) => void;
  passInputsValue: (event: any) => void;
  deleteAll: (event: any) => void;
}

const OptionsInterface = (props: Props) => {
  const [wordWarning, setWordWarning] = useState(false);
  const [translationWarning, setTranslationWarning] = useState(false);

  const translationIsValid = (event: any) => {
    let translation = event.target.value.trim();

    if (/\d/.test(translation)) {
      setTranslationWarning(true);
    } else setTranslationWarning(false);
  };

  const wordIsValid = (event: any) => {
    let word = event.target.value.trim();

    if (/\d/.test(word)) {
      setWordWarning(true);
    } else setWordWarning(false);
  };

  const passAndCheck = (event: any) => {
    event.preventDefault();
    let wordValue = event.target.word.value.trim();
    let translateValue = event.target.translation.value.trim();

    if (wordWarning === true || translationWarning === true) {
      return undefined;
    } else if (translateValue === '' && wordValue === '') {
      setTranslationWarning(true);
      setWordWarning(true);
    } else if (translateValue === '') {
      setTranslationWarning(true);
    } else if (wordValue === '') {
      setWordWarning(true);
    } else {
      props.passInputsValue(event);
    }
  };

  return (
    <motion.div
      className={styles['options']}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <input
        placeholder="Search"
        onChange={props.filterCards}
        className={styles['filter']}
      />
      <form
        onSubmit={passAndCheck}
        autoComplete="off"
        className={styles['options-form']}
      >
        <input
          id="word"
          placeholder="Word"
          className={wordWarning ? styles['word-warning'] : null}
          onChange={wordIsValid}
        />

        <button className={styles['add-button']} type="submit">
          <RiAddFill />
        </button>

        <input
          id="translation"
          placeholder="Translation"
          className={translationWarning ? styles['translation-warning'] : null}
          onChange={translationIsValid}
        />
      </form>

      <button onClick={props.deleteAll} className={styles['delete-all']}>
        <MdOutlineDeleteSweep />
      </button>
    </motion.div>
  );
};

export default OptionsInterface;

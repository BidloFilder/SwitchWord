import React, { useState } from 'react';
// @ts-ignore
import styles from './Options.module.scss';
import { MdAdd } from 'react-icons/md';
import { MdOutlineDeleteSweep } from 'react-icons/md';

interface Props {
  filterCards: (event: any) => void;
  passInputsValue: (event: any) => void;
  deleteAll: (event: any) => void;
}

const OptionsInterface = (props: Props) => {
  const [wordWarning, setWordWarning] = useState(false);
  const [translationWarning, setTranslationWarning] = useState(false);

  const translationIsValid = (event: any) => {
    if (!isNaN(event.target.value.trim())) {
      setTranslationWarning(true);
    } else setTranslationWarning(false);
  };

  const wordIsValid = (event: any) => {
    if (!isNaN(event.target.value.trim())) {
      setWordWarning(true);
    } else setWordWarning(false);
  };

  const passAndCheck = (event: any) => {
    event.preventDefault()
    let wordValue = event.target.word.value.trim();
    let translateValue = event.target.translation.value.trim();

    if (wordWarning === true || translationWarning === true) {
      return undefined;
    } else if (wordValue === '' || translateValue === '') {
      setWordWarning(true);
      setTranslationWarning(true);
    } else {
      props.passInputsValue(event);
    }
  };

  return (
    <>
      <input
        placeholder='Search'
        onChange={props.filterCards}
        className={styles.filter}
      />
      <form
        onSubmit={passAndCheck}
        autoComplete="off"
        className={styles.optionsForm}
      >
        <input
          id="word"
          placeholder="Word"
          className={wordWarning ? styles.wordWarning : null}
          onChange={wordIsValid}
        />

        <button className={styles.addBtn} type="submit"><MdAdd /></button>

        <input
          id="translation"
          placeholder="Translation"
          className={translationWarning ? styles.translationWarning : null}
          onChange={translationIsValid}
        />
      </form>

      <button onClick={props.deleteAll} className={styles.deleteAll}>
      <MdOutlineDeleteSweep />
      </button>
    </>
  );
};

export default OptionsInterface;

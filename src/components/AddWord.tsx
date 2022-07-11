import { RiAddFill } from 'react-icons/ri';
import { useState } from 'react';
import styles from '../components styles/AddWord.module.scss';
import { motion } from 'framer-motion';
import addWordAnimation from '../components animations/AddWordAnimations'

interface Props {
    passInputsValue: (event: any) => void;
}

const AddWord = (props: Props) => {
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
        <motion.form
            variants={addWordAnimation}
            initial="initial"
            animate="animate"
            onSubmit={passAndCheck}
            autoComplete="off"
            className={styles['add-form']}
        >
            <input
                id="word"
                placeholder="Word"
                className={wordWarning ? styles['word-warning'] : null}
                onChange={wordIsValid}
            />

            <button className={styles['add-button']} type="submit">
                <RiAddFill style={{ alignSelf: 'center' }} />
            </button>

            <input
                id="translation"
                placeholder="Translation"
                className={translationWarning ? styles['translation-warning'] : null}
                onChange={translationIsValid}
            />
        </motion.form>
    )
}

export default AddWord;
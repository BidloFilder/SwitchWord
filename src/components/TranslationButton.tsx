import { BiShow } from 'react-icons/bi';
import { MdOutlineTranslate } from 'react-icons/md';
import { motion } from 'framer-motion';
import styles from '../components styles/TranslationButton.module.scss'

interface Props {
    showTranslation: () => void;
}

const TranslationButton = (props: Props) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1, color: '#ffffff' }}
            transition={{ duration: 0.01 }}
            className={styles['translation-button']}
            type="button"
            onClick={props.showTranslation}
        >
            <BiShow />
            <MdOutlineTranslate />
        </motion.button>
    );
}

export default TranslationButton;
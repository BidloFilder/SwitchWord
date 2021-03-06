import styles from './AboutPage.module.scss'
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <motion.div
            transition={{ duration: .5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles['about']}>
            <h1 className={styles['headers']}>
                About
            </h1>
            <br />
            This app allows you to practice your specific words and translatons in foreign languages.
            <br />
            <br />
            There are three pages that can help you to do defferent things:
            <br />
            <br />
            <h3 className={styles['headers']}>
                First page
            </h3>
            <br />
            - it's a <a href='/' className={styles['link']}>main page</a>, where you can enter your answer in input which is on the left hand side, your answer must be correct translation of a word on the right hand side.
            <br />
            If your answer is right, word will change randomly, if it's not - you must try again or check the translation by pressing on the relevant button.
            <br />
            <br />
            <h3 className={styles['headers']}>
                Second page
            </h3>
            <br />
            - it's a <a href='list' className={styles['link']}>list of words</a>, where you enter word that you want to learn and its translation.
            <br />
            You can delete single word or all words, you can use filter to search for words.
            <br />
            <br />
            <h3 className={styles['headers']}>
                Third page
            </h3>
            <br />
            - it's "About" page, where you are now.
        </motion.div>
    )
}

export default AboutPage;
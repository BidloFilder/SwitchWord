import { motion } from 'framer-motion';
import styles from "../components styles/Answer.module.scss";
import { answerAnimation } from '../components animations/AnswerAnimations'


interface Props {
    checkAnswerHandler: (event: any) => void
}

const Answer = (props: Props) => {
    return (
        <motion.form
            variants={answerAnimation}
            initial="initial"
            animate="animate"
            onSubmit={props.checkAnswerHandler}
            className={styles['answer-form']}
        >
            <motion.input
                id="answer"
                className={styles['answer']}
                autoComplete="off"
                placeholder="Answer"
            />
        </motion.form>
    )
}

export default Answer;
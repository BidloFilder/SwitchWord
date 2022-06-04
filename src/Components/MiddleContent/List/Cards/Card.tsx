import styles from './Card.module.scss';
import { FiDelete } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Props {
  listValue: Array<object>;
  deleteWord: (event: any) => void;
}

const Card = (props: Props) => {
  return (
    <>
      {props.listValue.map((value) => {
        return (
          <motion.div
            //@ts-ignore
            key={value.id}
            //@ts-ignore
            id={value.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.card}
          >
            <span className={styles.word}>
              {Object.keys(value)[0].charAt(0).toUpperCase() +
                Object.keys(value)[0].slice(1).toLowerCase()}
            </span>

            <FiDelete
              type="button"
              onClick={props.deleteWord}
              className={styles.deleteCardBtn}
            />

            <span className={styles.translation}>
              {Object.values(value)[0].charAt(0).toUpperCase() +
                Object.values(value)[0].slice(1).toLowerCase()}
            </span>
          </motion.div>
        );
      })}
    </>
  );
};

export default Card;

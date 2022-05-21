// @ts-ignore
import styles from './Card.module.scss';
import { TiDeleteOutline } from 'react-icons/ti';

interface Props {
  listValue: Array<any>;
  deleteWord: (event: any) => void;
}

const Card = (props: Props) => {
  return (
    <>
      {props.listValue.map((value: object) => {
        return (
          //@ts-ignore
          <div className={styles.card} key={value.id} id={value.id}>
            <span
              className={styles.word}
            >
              {Object.keys(value)[0].charAt(0).toUpperCase() +
                Object.keys(value)[0].slice(1).toLowerCase()}
            </span>

            <TiDeleteOutline
              type="button"
              onClick={props.deleteWord}
              className={styles.deleteCardBtn}
            />

            <span
              className={styles.translation}
            >
              {Object.values(value)[0].charAt(0).toUpperCase() +
                Object.values(value)[0].slice(1).toLowerCase()}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Card;

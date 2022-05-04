// @ts-ignore
import styles from './Card.module.scss';

interface Props {
  listValue: Array<any>;
  deleteWord: (event: any) => void;
};


const Card = (props: Props) => {
  return (
    <div className={styles.listCards}>
      {props.listValue.map((value: object) => {
        return (
          //@ts-ignore
            <div className={styles.card} key={value.id} id={value.id}>
              <span
                style={{
                  fontWeight: '100',
                  color: '#ffffff',
                  justifySelf: 'center',
                }}
              >
                {Object.keys(value)[0].charAt(0).toUpperCase() +
                  Object.keys(value)[0].slice(1).toLowerCase()}
              </span>

              <button
                className={styles.deleteCardBtn}
                onClick={props.deleteWord}
                type="button"
              ></button>

              <span
                style={{
                  fontWeight: '400',
                  color: '#ffffff',
                  justifySelf: 'center',
                }}
              >
                {Object.values(value)[0].charAt(0).toUpperCase() +
                  Object.values(value)[0].slice(1).toLowerCase()}
              </span>
            </div>
        );
      })}
    </div>
  );
};

export default Card;

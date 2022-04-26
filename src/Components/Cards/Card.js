import styles from './Card.module.scss';


const Card = (props) => {

  return (
    <div className={styles.listCards}>
      {props.listValue.map((value) => {
        return (
          <div key={value.id}>
            <div className={styles.card}>
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
          </div>
        );
      })}
    </div>
  );
};

export default Card;

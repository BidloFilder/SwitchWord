import styles from './App.module.scss';
import MainContent from './Components/MiddleContent/MainScreen/MainContent/MainContent';
import ErrorPage from './Components/MiddleContent/MainScreen/ErrorPage/ErrorPage';
import List from './Components/MiddleContent/List/List';
import AboutPage from './Components/MiddleContent/MainScreen/AboutPage/AboutPage';
import Navigation from './Components/TopContent/Navigation';
import style from '../src/Components/TopContent/Navigation.module.scss';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { RiHome2Line } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

let WORDS: Array<object> = [];
WORDS = JSON.parse(localStorage.getItem('words'));

const logoAnimation = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 0.5,
      duration: 1,
    },
  },
};

const topBoxAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
};

const middleBoxAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  },
};

function App() {
  const addNewWords = (word: string, translation: string) => {
    let object = { [word]: translation, id: uuidv4() };
    WORDS = [object, ...WORDS];
    return WORDS;
  };

  const deleteWords = (event: any) => {
    let id = event.target.parentNode.id;

    WORDS = WORDS.filter((item: any) => item.id !== id);
    return WORDS;
  };

  const deleteAll = () => {
    WORDS = [];
    return WORDS;
  };

  const getWords = () => {
    if (WORDS == null) {
      return [];
    } else return WORDS;
  };

  return (
    <div className={styles['main-box']}>
      <div className={styles['inner-box']}>
        <motion.div
          variants={topBoxAnimation}
          initial="initial"
          animate="animate"
          className={styles['top-box']}
        >
          <motion.span
            className={styles['logo']}
            variants={logoAnimation}
            initial="initial"
            animate="animate"
          ></motion.span>
          <Navigation
            icon={<RiHome2Line />}
            style={style['home']}
            navigateTo={'/'}
          />
          <Navigation
            icon={<AiOutlineUnorderedList />}
            style={style['list']}
            navigateTo={'list'}
          />
          <Navigation
            icon={<AiOutlineInfoCircle />}
            style={style['about']}
            navigateTo={'about'}
          />
        </motion.div>
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                className={styles['middle-box']}
                variants={middleBoxAnimation}
                initial="initial"
                animate="animate"
              >
                <MainContent getWords={getWords} />
              </motion.div>
            }
          />

          <Route path="about" element={<AboutPage />} />

          <Route path="*" element={<ErrorPage />} />

          <Route
            path="list"
            element={
              <div className={styles['words-box']}>
                <List
                  deleteWords={deleteWords}
                  addNewWords={addNewWords}
                  deleteAll={deleteAll}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

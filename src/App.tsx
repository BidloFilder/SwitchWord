import styles from './App.module.scss';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import List from './pages/ListPage/List';
import AboutPage from './pages/AboutPage/AboutPage';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import Header from './pages/Header/Header';
import { middleBoxAnimation } from './AppAnimaitons'
import Links from './components/Links';
import { BsTelegram } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import linksStyles from './components styles/Links.module.scss'

let WORDS: Array<object> = [];
WORDS = JSON.parse(localStorage.getItem('words'));

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
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                className={styles['content-box']}
                variants={middleBoxAnimation}
                initial="initial"
                animate="animate"
              >
                <MainPage getWords={getWords} />
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
        <div className={styles['links-wrapper']}>
          <Links
            icon={<BsTelegram />}
            link={'https://t.me/BidloFilder'}
            linksStyles={linksStyles['telegram']} />
          <Links
            icon={<AiFillGithub />}
            link={'https://github.com/BidloFilder/SwitchWord'} linksStyles={linksStyles['github']} />
        </div>

      </div>
    </div>
  );
}

export default App;

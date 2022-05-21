// @ts-ignore
import styles from './App.module.scss';
// @ts-ignore
import AnswerAndWord from './Components/MiddleContent/MainScreen/AnswerAndWord/AnswerAndWord.tsx';
// @ts-ignore
import ErrorPage from './Components/MiddleContent/MainScreen/ErrorPage/ErrorPage.tsx';
// @ts-ignore
import List from './Components/MiddleContent/List/Options/List.tsx';
// @ts-ignore
import AboutPage from './Components/MiddleContent/MainScreen/AboutPage/AboutPage.tsx';
// @ts-ignore
import Navigation from './Components/TopContent/Navigation.tsx';
// @ts-ignore
import style from '../src/Components/TopContent/Navigation.module.scss';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { RiHome2Line } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

let WORDS = [];
WORDS = JSON.parse(localStorage.getItem('words'));

function App() {
  const addNewWordsHandler = (word: string, translation: string) => {
    let object = { [word]: translation, id: uuidv4() };
    WORDS = [object, ...WORDS];
    return WORDS;
  };

  const deleteWordsHandler = (event: any) => {
    let id = event.target.parentNode.id;

    WORDS = WORDS.filter(
      // @ts-ignore
      (item: object) => item.id !== id
    );
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
    <Router>
      <div className={styles.mainBox}>
        <div className={styles.innerBox}>
          <div className={styles.topBox}>
            <span className={styles.logo}>SwitchWord.</span>
            <Navigation
              icon={<RiHome2Line />}
              style={style.home}
              navigateTo={'/'}
            />
            <Navigation
              icon={<AiOutlineUnorderedList />}
              style={style.list}
              navigateTo={'list'}
            />
            <Navigation
              icon={<AiOutlineInfoCircle />}
              style={style.about}
              navigateTo={'about'}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.middleBox}>
                  <AnswerAndWord getWords={getWords} />
                </div>
              }
            />

            <Route path="about" element={<AboutPage />} />

            <Route path="*" element={<ErrorPage />} />

            <Route
              path="list"
              element={
                <div className={styles.cardsBox}>
                  <List
                    deleteWordsHandler={deleteWordsHandler}
                    addNewWordsHandler={addNewWordsHandler}
                    deleteAll={deleteAll}
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

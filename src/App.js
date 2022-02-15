import TranslateInput from './Components/MainInputsAndButton/TranslateInput';
import './App.css';

const WORDS = {
  'Manger': 'есть',
  'Lire': 'читать',
  'Table': 'стол',
};

const randomWord = () =>
  Object.entries(WORDS)[
    Math.floor(Math.random() * Object.entries(WORDS).length)
  ];

function App() {
  return (
    <div className="box">
      <TranslateInput words={randomWord} />
    </div>
  );
}

export default App;

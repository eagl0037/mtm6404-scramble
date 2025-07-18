/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

function App() {
  const [words, setWords] = React.useState([
    'banana',
    'react',
    'javascript',
    'component',
    'shuffle',
    'programming'
  ]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [guess, setGuess] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [message, setMessage] = React.useState('');

  const word = words[currentWordIndex];
  const scrambled = React.useMemo(() => shuffle(word), [currentWordIndex]);

  function handleGuessSubmit(e) {
    e.preventDefault();

    if (guess.toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
      setMessage('Correct!');
      nextWord();
    } else {
      setStrikes(strikes + 1);
      setMessage('Try again!');
      if (strikes + 1 >= 3) {
        nextWord();
      }
    }

    setGuess('');
  }

  function nextWord() {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMessage('🎉 Game over! Final score: ' + score);
    }
    setStrikes(0);
  }

  function resetGame() {
    setCurrentWordIndex(0);
    setScore(0);
    setStrikes(0);
    setMessage('');
    setGuess('');
  }

  return (
    <div className="container">
      <h1>Scramble Game</h1>
      <p><strong>Scrambled Word:</strong> {scrambled}</p>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess..."
        />
        <button type="submit">Guess</button>
      </form>
      <p>Score: {score} | Strikes: {strikes}</p>
      <p>{message}</p>
      <button onClick={resetGame}> Restart</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

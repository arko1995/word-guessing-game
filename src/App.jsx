import Header from "../components/Header";
import Status from "../components/Status";
import Languages from "../components/Languages";
import { useState } from "react";
import Keyboard from "../components/Keyboard";
import { languages } from "../languages";
import { words } from "../words.js";
import Confetti from "react-confetti";
import { clsx } from "clsx";

export default function App() {
  function newRandomWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    return word;
  }

  const [currentWord, setCurrentWord] = useState(() => newRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  let wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.toLowerCase().includes(letter.toLowerCase()),
  ).length;

  const isGameWon = currentWord
    .toUpperCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const langName = languages.map((obj) => obj.name);
  console.log(langName[wrongGuessCount]);

  let isGameOver = isGameWon || isGameLost;

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) => {
      return prev.includes(letter) ? prev : [...prev, letter];
    });
  }

  const panel = [...currentWord.toUpperCase()].map((letter, index) => {
    const revealLetters = isGameLost || guessedLetters.includes(letter);
    const LetterClassname = clsx({
      "wrong-letters": isGameLost && !guessedLetters.includes(letter),
      "correct-letters": isGameOver && guessedLetters.includes(letter),
    });
    return (
      <span className={LetterClassname} key={index}>
        {revealLetters ? letter : ""}
      </span>
    );
  });

  function newGame() {
    setCurrentWord(newRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <Header />
      <Status
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
        toBeEliminated={langName[wrongGuessCount - 1]}
        wrongGuessCount={wrongGuessCount}
      />
      <Languages wrongGuessCount={wrongGuessCount} />
      <section className="panel">{panel}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          Current Word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter : "blank",
            )
            .join("")}
        </p>
      </section>
      <Keyboard
        isGameOver={isGameOver}
        guessedLetter={guessedLetters}
        currentWord={currentWord}
        onClick={addGuessedLetter}
      />
      {isGameOver ? (
        <button className="newGame" onClick={newGame}>
          New Game
        </button>
      ) : null}
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
    </main>
  );
}

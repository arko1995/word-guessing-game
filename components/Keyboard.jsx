import clsx from "clsx";
export default function Keyboard(props) {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letters = [...keys].map((letter) => {
    const isGuessed = props.guessedLetter.includes(letter);
    const isCorrect =
      isGuessed && props.currentWord.toUpperCase().includes(letter);
    const isWrong =
      isGuessed && !props.currentWord.toUpperCase().includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
      disabled: props.isGameOver,
    });

    return (
      <button
        aria-disabled={props.isGameOver}
        disabled={props.isGameOver ? "true" : null}
        key={letter}
        className={className}
        onClick={() => props.onClick(letter)}
        value={letter}
      >
        {letter}
      </button>
    );
  });

  return <div className="keyboard">{letters}</div>;
}

import { farewellMessages } from "../utils/utils.js";
import { languages } from "../languages.js";
import { useEffect, useState } from "react";
export default function Status(props) {
  const backGroundColor = () => {
    const color = languages.find(
      (color) => color.name === props.toBeEliminated,
    )?.backgroundColor;

    return color;
  };

  const [fareWellMessage, setFareWellMessage] = useState("");

  useEffect(() => {
    if (props.wrongGuessCount > 0) {
      setFareWellMessage(farewellMessages(props.toBeEliminated));
    }
  }, [props.wrongGuessCount, props.toBeEliminated]);

  const textColor = () => {
    const text = languages.find(
      (textColor) => textColor.name === props.toBeEliminated,
    )?.color;

    return text;
  };

  function renderStatus() {
    if (!props.isGameOver) {
      return (
        <section
          className="game-status"
          style={{
            backgroundColor: props.wrongGuessCount
              ? backGroundColor()
              : "transparent",

            alignItems: "center",
            justifyContent: "center",
            color: textColor(),

            fontStyle: "italic",
          }}
        >
          {props.wrongGuessCount > 0 && <h2>{fareWellMessage}</h2>}
        </section>
      );
    }

    if (props.isGameWon) {
      return (
        <section className="game-status">
          <h2>Congratulations!</h2>
          <p>Well Done</p>
        </section>
      );
    } else {
      return (
        <section className="game-status" style={{ backgroundColor: "red" }}>
          <h2>Game Over!</h2>
          <p style={{ fontSize: "10px" }}>
            You Lost, Better Start Learning Assembly
          </p>
        </section>
      );
    }
  }

  return (
    <section aria-live="polite" role="status">
      {renderStatus()}
    </section>
  );
}

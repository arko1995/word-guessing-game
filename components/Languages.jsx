import { languages } from "../languages.js";
import clsx from "clsx";
export default function Languages(props) {
  const langElement = languages.map((lang, index) => {
    const style = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const isAffected = index < props.wrongGuessCount;
    const className = clsx("chip", isAffected && "lost");
    return (
      <span className={className} key={lang.name} style={style}>
        {lang.name}
      </span>
    );
  });

  return <div className="languages">{langElement}</div>;
}

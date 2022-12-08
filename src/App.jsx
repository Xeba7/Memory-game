import { useState } from "react";
import "./App.css";

function ResetButton(props) {
  return <button onClick={props.handleClick}>Reiniciar juego</button>;
}

function Card(props) {
  const className = `card ${props.isDisabled ? "disabled" : ""} ${
    props.isSolved ? "solved" : ""
  }`;

  return (
    <div className={className} onClick={() => props.handleClick(props.id)}>
      {props.isFlipped ? props.value : ""}
    </div>
  );
}
function GameBoard(props) {
  const [cards, setCards] = useState(
    props.cards.sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  function handleClick(id) {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 1000);
      }
    }
  }

  function sameCardClicked(id) {
    return flipped.includes(id);
  }
  function resetGame() {
    setCards(props.cards.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setSolved([]);
  }

  function isMatch(id) {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.value === clickedCard.value;
  }

  function resetCards() {
    setFlipped([]);
    setDisabled(false);
  }

  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={flipped.includes(card.id)}
          isSolved={solved.includes(card.id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(card.id)}
        />
      ))}
      <ResetButton handleClick={resetGame} />
    </div>
  );
}

const cards = [
  { id: 1, value: "A" },
  { id: 2, value: "A" },
  { id: 3, value: "B" },
  { id: 4, value: "B" },
  { id: 5, value: "C" },
  { id: 6, value: "C" },
];

function App() {
  return (
    <div>
      <GameBoard cards={cards} />
    </div>
  );
}

export default App;

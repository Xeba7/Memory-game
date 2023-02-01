import { useState, useEffect } from "react";
import { Cards } from "./Cards";
import Navbar from "./navbar";
import Card from "./Card";

function App() {
  const initialState = {
    cards: Cards,
    cardsChosenId: [],
    cardsWon: [],
    selectedCards: 0,
  };

  const [state, setState] = useState(initialState);

  const shuffleCards = () => {
    const cardFalse = state.cards.map((card) => {
      return {
        ...card,
        isFlipped: false,
      };
    });
    const shuffledCards = [...cardFalse].sort(() => 0.5 - Math.random());
    setState({
      ...state,
      cards: shuffledCards,
      cardsChosenId: [],
      cardsWon: [],
      selectedCards: 0,
    });
  };
  useEffect(shuffleCards, []);

  const flipCard = (id) => {
    if (state.selectedCards === 2) {
      return;
    }
    const newCards = state.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isFlipped: !card.isFlipped,
        };
      }
      return card;
    });
    setState({
      ...state,
      cards: newCards,
      cardsChosenId: [...state.cardsChosenId, id],
      selectedCards: state.selectedCards + 1,
    });
  };

  useEffect(() => {
    if (state.cardsChosenId.length === 2) {
      const card1 = state.cards.find(
        (card) => card.id === state.cardsChosenId[0]
      );
      const card2 = state.cards.find(
        (card) => card.id === state.cardsChosenId[1]
      );
      if (card1.name === card2.name) {
        setState({
          ...state,
          cardsWon: [...state.cardsWon, card1.name],
          cardsChosenId: [],
          selectedCards: 0,
        });
      } else {
        setTimeout(() => {
          const newCards = state.cards.map((card) => {
            if (
              card.id === state.cardsChosenId[0] ||
              card.id === state.cardsChosenId[1]
            ) {
              return {
                ...card,
                isFlipped: false,
              };
            }
            return card;
          });
          setState({
            ...state,
            cards: newCards,
            cardsChosenId: [],
            selectedCards: 0,
          });
        }, 1000);
      }
    }
  }, [state.cardsChosenId]);

  function Finish() {
    if (state.cardsWon.length === state.cards.length / 2) {
      return (
        <section className="text-8xl font-bold text-red-600 rounded-lg text-center">
          YOU WIN
        </section>
      );
    }
  }

  return (
    <div className="h-full sm:p-5  min-w-fit">
      <Navbar />
      <h1 className="text-center font-bold text-7xl  pb-3 text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-400">
        Memory game
      </h1>
      <div className="flex justify-center">
        <button
          className="bg-black text-white w-40 px-6 mt-2 py-2  font-semibold text-xl transition ease-in duration-200 uppercase hover:scale-105 rounded-full hover:bg-slate-800 border-4 hover:border-white focus:outline-none"
          onClick={shuffleCards}
        >
          Play
        </button>
      </div>
      <Finish />
      <div className="container  grid grid-cols-4 w-[480px] mt-5 bg-white rounded-lg gap-3 border-black border-2 p-5 shadow-2xl shadow-black">
        {state.cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            img={card.img}
            flipCard={flipCard}
            isFlipped={card.isFlipped}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

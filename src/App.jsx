import { useState, useEffect } from "react";
import { Cards } from "./Cards";

const Card = ({ name, img, flipCard, id, isFlipped }) => {
  return (
    <img
      src={isFlipped ? img : "src/images/question.svg"}
      alt={name}
      onClick={() => {
        if (!isFlipped) flipCard(id);
      }}
      className="w-full h-full   object-contain hover:scale-105"
    ></img>
  );
};

function App() {
  const [cards, setCards] = useState(Cards);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [selectedCards, setSelectedCards] = useState(0);

  const shuffleCards = () => {
    const cardFalse = cards.map((card) => {
      return {
        ...card,
        isFlipped: false,
      };
    });
    const shuffledCards = [...cardFalse].sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
    setCardsChosenId([]);
    setCardsWon([]);
    setSelectedCards(0);
  };
  useEffect(shuffleCards, []);

  const flipCard = (id) => {
    if (selectedCards == 2) {
      return;
    }
    setSelectedCards(selectedCards + 1);
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isFlipped: !card.isFlipped,
        };
      }
      return card;
    });
    setCardsChosenId([...cardsChosenId, id]);
    setCards(newCards);
  };

  useEffect(() => {
    if (cardsChosenId.length === 2) {
      const card1 = cards.find((card) => card.id === cardsChosenId[0]);
      const card2 = cards.find((card) => card.id === cardsChosenId[1]);
      if (card1.name === card2.name) {
        setCardsWon([...cardsWon, card1.name]);
        setSelectedCards(0);
      } else {
        setTimeout(() => {
          const newCards = cards.map((card) => {
            if (card.id === cardsChosenId[0] || card.id === cardsChosenId[1]) {
              return {
                ...card,
                isFlipped: false,
              };
            }
            return card;
          });
          setCards(newCards);
          setSelectedCards(0);
        }, 1500);
      }
      setCardsChosenId([]);
    }
  }, [cardsChosenId, cardsWon]);

  function Finish() {
    if (cardsWon.length === Cards.length / 2) {
      return (
        <section className="text-8xl font-bold text-black rounded-lg text-center">
          YOU WIN
        </section>
      );
    }
  }

  return (
    <div className="h-full p-5">
      <h1 className="text-center font-bold text-7xl pb-5 text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-400">
        Memory game
      </h1>
      <div className="flex justify-center pt-10">
        <button
          className="bg-black text-white w-40 px-6 py-2 mt-5 font-semibold text-xl transition ease-in duration-200 uppercase rounded-full hover:bg-gray-600  border-4 hover:border-white focus:outline-none"
          onClick={shuffleCards}
        >
          Play
        </button>
      </div>
      <Finish />
      <div className="container  grid grid-cols-4 w-[480px]  mt-10  bg-white rounded-lg gap-3 border-black border-2 p-5">
        {cards.map((card) => (
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

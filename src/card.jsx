import Question from "./images/question.svg";

export default function Card({ name, img, flipCard, id, isFlipped }) {
  return (
    <img
      src={isFlipped ? img : Question}
      alt={name}
      onClick={() => {
        if (!isFlipped) flipCard(id);
      }}
      className={`w-full h-full   object-contain hover:scale-105 ${
        isFlipped ? "none" : "border-[1px] border-black rounded-md"
      }`}
    ></img>
  );
}

import { useState } from 'react'
import './App.css'
import { cardData } from './cardData';

function App() {

  const[index, setIndex] = useState(0);
  let currentCard = cardData[index];
  let numOfCards = cardData.length;
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardValue, setCardValue] = useState(currentCard.side1);

  const flipCard = () => {
    if (!isFlipped) { // If currently showing side1, prepare to show side2
      setCardValue(currentCard.side2);
    } else { // If currently showing side2, prepare to show side1
      setCardValue(currentCard.side1);
    }
    setIsFlipped(prevIsFlipped => !prevIsFlipped);
  };

  //chooses a new random index to display next
  const chooseNextCard = (max, prevIndex) => {
    if (max <= 1) {
      return 0; // Only one card, so return its index
    }
    let newIndex = Math.floor(Math.random() * max);
    while (newIndex === prevIndex) {
      newIndex = Math.floor(Math.random() * max);
    }
    prevIndex = newIndex;
    return newIndex
  }
  
  //combine choosing new index and refreshing display with said index
  const newCardProcedure = () => {
    let newIndex = chooseNextCard(numOfCards, index);
    setIndex(newIndex);
    setCardValue(cardData[newIndex].side1);
    setIsFlipped(false); // Reset flip state for the new card
  }

  return (
    <>
      <h1 class="glow">Moths of North Carolina</h1>
      <h2>Test your knowledge of our local fuzzies</h2>
      <h3>Number of Cards: {numOfCards}</h3>
      <div className={"flashcard-container"}>
      <div
        id="flashcard"
        className={isFlipped ? 'flipped' : ''}
        onClick={flipCard}
      >
        <div className={"card-face front " + currentCard.color}>
          {currentCard.side1}
          <img src={currentCard.image}/>
        </div>
        <div className={"card-face back " + currentCard.color}>
          {currentCard.side2}
        </div>
      </div>
    </div>

    <button id="nextButton" onClick={newCardProcedure}>Next</button>

    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { cardData } from './cardData';
import InputGuess from './components/InputGuess';

function App() {

  const [cardOrder, setCardOrder] = useState([...cardData]);
  const[index, setIndex] = useState(0);
  let currentCard = cardOrder[index];
  let numOfCards = cardData.length;

  const [isFlipped, setIsFlipped] = useState(false);
  const [cardValue, setCardValue] = useState(currentCard.side1);
  const [prevActive, setprevActive] = useState("false");
  const [nextActive, setNextActive] = useState("true");

  const [input, setInput] = useState(''); //this is for InputGuess, lift state up

  const flipCard = () => {
    if (!isFlipped) { // If currently showing side1, prepare to show side2
      setCardValue(currentCard.side2);
    } else { // If currently showing side2, prepare to show side1
      setCardValue(currentCard.side1);
    }
    setIsFlipped(prevIsFlipped => !prevIsFlipped);
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      newCardProcedure();
      setNextActive("true");
    }
    else {
      setprevActive("false");
    }
  }

  const nextCard = () => {
    if (index < numOfCards - 1) {
      setIndex(index + 1);
      newCardProcedure();
      setprevActive("true");
  }
  else {
    setNextActive("false");
  }
}

  //combine choosing new index and refreshing display with said index
  const newCardProcedure = (order = cardOrder, newIndex = index) => {
    setCardValue(order[newIndex].side1);
    setIsFlipped(false);
    setInput('');
  }

  const shuffleCards = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    //alert("Shuffled order:\n" + shuffled.map(obj => obj.side2).join('\n'));
    setCardOrder(shuffled);
    setIndex(0);
    newCardProcedure(shuffled, 0);
  };

  // const removeCard = () => {

  //<button classname="masteredButton">⭐</button>

  //   const updatedCards = [...cardOrder];
  //   updatedCards.splice(index, 1); // Remove current card
  //   if (updatedCards.length === 0) {
  //     alert("You mastered all cards!");
  //     return;
  //   }
  
  //   const newIndex = index >= updatedCards.length ? updatedCards.length - 1 : index;
  //   setCardOrder(updatedCards);
  //   setIndex(newIndex);
  //   newCardProcedure(updatedCards, newIndex);
  // };
  
  return (
    <>
      <h1 className="glow">Moths of North Carolina</h1>
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
 
    {!isFlipped ? (<InputGuess //only show if card isnt flipped
    answer={currentCard.side2}
    input={input}//passing this state variable down to input
    onChange={(e) => setInput(e.target.value)} //passing setter func so it can control state of inherited variable
    />) : null}
    <div className="changeCardButtonContainer">
    <button className={"changeCardButton prev " + prevActive} onClick={prevCard}>Prev</button>

    <button className="changeCardButton shuffle" onClick={shuffleCards}>Shuffle</button>

    <button className={"changeCardButton next " + nextActive} onClick={nextCard}>Next</button>
    </div>
    </>
  )
}

export default App;

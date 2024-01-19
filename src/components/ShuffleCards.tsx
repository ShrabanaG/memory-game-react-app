import { useEffect, useState } from "react"
import SingleCard from "./SingleCard";

const cardImages = [
    {"src": "/img/potion-1.png", matched: false },
    {"src": "/img/scroll-1.png",  matched: false},
    {"src": "/img/ring-1.png", matched: false},
    {"src": "/img/helmet-1.png", matched: false},
    {"src": "/img/shield-1.png", matched: false},
    {"src": "/img/sword-1.png", matched: false},
]    

const ShuffleCards = () => {
    const [cards, setCards] = useState<any>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<any>(null);
    const [choiceTwo, setChoiceTwo] = useState<any>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleShuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
                              .map((card) => ({...card, id: Math.random()}) );
        setChoiceOne(null);
        setChoiceTwo(null);                      
        setCards(shuffledCards) ;
        setTurns(0);                     
                            
    }
    
    //handle a choice
    const handleEachCardChoiceClick = (card:any) => {
        choiceOne? setChoiceTwo(card) : setChoiceOne(card)
    } 

    //compare two selected card
    useEffect(() => {
        
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards: any) => {
                    return prevCards.map((eachCard : any) => {
                        if (eachCard.src === choiceOne.src) {
                            return {...eachCard, matched: true}
                        } else {
                            return eachCard
                        }
                    })
                })
                handleResetChoices();
            } else {
                setTimeout(() => handleResetChoices(), 1000)
                
            }
        }

    }, [choiceOne, choiceTwo])

    // starts the game automatically
    useEffect(() => {
        handleShuffleCards();

    },[])

    const handleResetChoices = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurn => prevTurn + 1);
        setDisabled(false);
    }

    return (
        <>
            <h1>Magic Memory</h1>
            <button onClick={handleShuffleCards}>New Game</button>
            <div className="card-grid-container">
                {cards.map((card:any) => {
                    return (
                        <SingleCard 
                            key={card.id} 
                            card={card} 
                            handleEachCardChoiceClick={handleEachCardChoiceClick}
                            flipped={ card === choiceOne || card === choiceTwo || card.matched === true}
                            disabled={disabled}
                        />
                    )

                })}
            </div>
            <p>Turns: {turns}</p>
        </>
    )

}

export default ShuffleCards;
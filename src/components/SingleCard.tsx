interface SingleCardProps {
    key: number;
    card: any;
    handleEachCardChoiceClick: (card:any) => void;
    flipped: boolean;
    disabled: boolean;
}



const SingleCard: React.FC<SingleCardProps> = ({key,card, handleEachCardChoiceClick, flipped, disabled}) => {
    const handleCardClick = () => {
        if (!disabled) {
            handleEachCardChoiceClick(card);
        }      
    }
    
    return (
        <div key={key} className="each-card">
            <div className={flipped ? "flipped-card" : ""}>
                <img src={card.src} alt="card front" className="each-card-front" />
                <img src="/img/cover.png" 
                    className="card-back" 
                    alt="card-cover-img" 
                    onClick={handleCardClick}
                />
            </div>
           

       </div>
    )

}

export default SingleCard;
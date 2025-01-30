import { Card } from './Card';

interface CardsProps {
  cards: Card[];
}

export const CardList = ({ cards }: CardsProps) => {
  //console.log('cards', cards);
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
    {cards.map((card) => (
      <Card key={card.id} card={card} viewImage={() => {}} />
    ))}
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}

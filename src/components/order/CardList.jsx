import CardCard from "./CardCard";
import SelectionGrid from "./SelectionGrid";

function CardList({
    cards,
    selectedCard,
    deletingCardId,
    showAddCard = false,
    onAdd,
    onSelect,
    onEdit,
    onDelete,
    radioGroupName,
}) {
    return (
        <SelectionGrid
            showAddItem={showAddCard}
            addItemText="Add New Card"
            onAddItem={onAdd}
        >
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="h-full"
                >
                    <CardCard
                        card={card}
                        selected={
                            selectedCard?.id ===
                            card.id
                        }
                        isDeleting={
                            deletingCardId ===
                            card.id
                        }
                        onSelect={onSelect}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        name={radioGroupName}
                    />
                </div>
            ))}
        </SelectionGrid>
    );
}

export default CardList;

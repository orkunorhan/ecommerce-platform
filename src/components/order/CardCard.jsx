import {
    CalendarDays,
    CreditCard,
    Pencil,
    Trash2,
    UserRound,
} from "lucide-react";

function CardCard({
    card,
    selected,
    isDeleting,
    onSelect,
    onEdit,
    onDelete,
    name,
}) {
    const cardNumber = String(
        card.card_no ?? "",
    );

    const lastFourDigits =
        cardNumber.slice(-4);

    const handleKeyDown = (event) => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            onSelect(card);
        }
    };

    return (
        <article
            className={`flex h-full min-h-[200px] flex-col rounded-lg border bg-white p-5 transition-all ${selected
                ? "border-[#23A6F0] shadow-[0_4px_14px_rgba(35,166,240,0.16)]"
                : "border-[#E6E6E6] hover:border-[#23A6F0]"
                }`}
        >
            <div className="flex flex-1 items-start gap-3">
                <input
                    type="radio"
                    name={name}
                    checked={selected}
                    onChange={() =>
                        onSelect(card)
                    }
                    aria-label={`Select card ending ${lastFourDigits}`}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#1C9BE4]"
                />

                <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                        onSelect(card)
                    }
                    onKeyDown={handleKeyDown}
                    className="min-w-0 flex-1 cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <CreditCard
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-[#737373]"
                        />

                        <h3 className="truncate font-bold text-[#252B42]">
                            **** **** ****{" "}
                            {lastFourDigits}
                        </h3>
                    </div>

                    <div className="mt-5 space-y-2">
                        <div className="flex items-start gap-2">
                            <UserRound
                                size={17}
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 text-[#737373]"
                            />

                            <p className="min-w-0 truncate text-sm leading-5 text-[#252B42]">
                                {card.name_on_card}
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <CalendarDays
                                size={17}
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 text-[#737373]"
                            />

                            <p className="text-sm leading-5 text-[#252B42]">
                                Expires{" "}
                                {card.expire_month}/
                                {card.expire_year}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <button
                        type="button"
                        onClick={() =>
                            onEdit(card)
                        }
                        disabled={isDeleting}
                        aria-label={`Edit card ending ${lastFourDigits}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#23A6F0] transition-colors hover:bg-[#EAF6FD] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Pencil
                            size={17}
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(card)
                        }
                        disabled={isDeleting}
                        aria-label={`Delete card ending ${lastFourDigits}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#E74040] transition-colors hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2
                            size={17}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>

            {isDeleting && (
                <p
                    role="status"
                    className="mt-4 text-xs font-semibold text-[#737373]"
                >
                    Deleting card...
                </p>
            )}
        </article>
    );
}

export default CardCard;

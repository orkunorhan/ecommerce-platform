import {
    MapPin,
    Pencil,
    Phone,
    Trash2,
    UserRound,
} from "lucide-react";

function AddressCard({
    address,
    selected,
    onSelect,
    onEdit,
    onDelete,
    isDeleting,
    name,
}) {
    const fullName = `${address.name} ${address.surname}`;

    return (
        <article
            className={`rounded-lg border bg-white p-5 transition-all ${selected
                ? "border-[#23A6F0] shadow-[0_4px_14px_rgba(35,166,240,0.16)]"
                : "border-[#E6E6E6] hover:border-[#23A6F0]"
                }`}
        >
            <div className="flex items-start gap-3">
                <input
                    type="radio"
                    name={name}
                    checked={selected}
                    onChange={() => onSelect(address)}
                    aria-label={`Select ${address.title}`}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#1c9be4]"
                />

                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect(address)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {
                            event.preventDefault();
                            onSelect(address);
                        }
                    }}
                    className="min-w-0 flex-1 cursor-pointer"
                >
                    <h3 className="break-words text-sm font-bold text-[#252B42]">
                        {address.title}
                    </h3>

                    <div className="mt-4 flex items-start gap-2 text-sm text-[#252B42]">
                        <UserRound
                            size={16}
                            className="mt-0.5 shrink-0 text-[#737373]"
                        />

                        <span>{fullName}</span>
                    </div>

                    <div className="mt-2 flex items-start gap-2 text-sm text-[#252B42]">
                        <Phone
                            size={16}
                            className="mt-0.5 shrink-0 text-[#737373]"
                        />

                        <span>{address.phone}</span>
                    </div>

                    <div className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#252B42]">
                        <MapPin
                            size={16}
                            className="mt-1 shrink-0 text-[#737373]"
                        />

                        <div className="min-w-0">
                            <p className="break-words">
                                {address.neighborhood}
                                {address.address && `, ${address.address}`}
                            </p>

                            <p className="mt-1 break-words">
                                {address.district}/{address.city}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <button
                        type="button"
                        onClick={() => onEdit(address)}
                        disabled={isDeleting}
                        aria-label={`Edit ${address.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#23A6F0] transition-colors hover:bg-[#EAF6FD] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Pencil size={17} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(address)}
                        disabled={isDeleting}
                        aria-label={`Delete ${address.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#E74040] transition-colors hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>

            {isDeleting && (
                <p className="mt-4 text-xs font-semibold text-[#737373]">
                    Deleting address...
                </p>
            )}
        </article>
    );
}

export default AddressCard;

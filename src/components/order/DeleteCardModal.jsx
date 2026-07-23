import { useEffect } from "react";
import {
    AlertTriangle,
    CalendarDays,
    CreditCard,
    LoaderCircle,
    UserRound,
    X,
} from "lucide-react";

function DeleteCardModal({
    isOpen,
    card,
    isDeleting,
    onConfirm,
    onClose,
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleEscapeKey = (event) => {
            if (
                event.key === "Escape" &&
                !isDeleting
            ) {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscapeKey,
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleEscapeKey,
            );
        };
    }, [isOpen, isDeleting, onClose]);

    if (!isOpen || !card) {
        return null;
    }

    const lastFourDigits = String(
        card.card_no,
    ).slice(-4);

    return (
        <div
            role="presentation"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isDeleting
                ) {
                    onClose();
                }
            }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 px-4 py-6"
        >
            <section
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-card-title"
                aria-describedby="delete-card-description"
                className="w-full max-w-[460px] overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
                <div className="flex items-start justify-between border-b border-[#E6E6E6] px-5 py-4 sm:px-6">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF1F1] text-[#E74040]">
                            <AlertTriangle
                                size={22}
                                aria-hidden="true"
                            />
                        </div>

                        <div>
                            <h2
                                id="delete-card-title"
                                className="text-lg font-bold text-[#252B42]"
                            >
                                Delete Card
                            </h2>

                            <p className="mt-1 text-sm text-[#737373]">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        aria-label="Close delete confirmation"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#252B42] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X
                            size={20}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="px-5 py-5 sm:px-6">
                    <p
                        id="delete-card-description"
                        className="text-sm leading-6 text-[#737373]"
                    >
                        Are you sure you want to delete the
                        following saved card?
                    </p>

                    <div className="mt-4 rounded-lg border border-[#E6E6E6] bg-[#FAFAFA] p-4">
                        <div className="flex items-center gap-2">
                            <CreditCard
                                size={17}
                                aria-hidden="true"
                                className="shrink-0 text-[#737373]"
                            />

                            <p className="font-bold text-[#252B42]">
                                **** **** **** {lastFourDigits}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-[#252B42]">
                            <UserRound
                                size={16}
                                aria-hidden="true"
                                className="shrink-0 text-[#737373]"
                            />

                            <span>
                                {card.name_on_card}
                            </span>
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-[#252B42]">
                            <CalendarDays
                                size={16}
                                aria-hidden="true"
                                className="shrink-0 text-[#737373]"
                            />

                            <span>
                                Expires{" "}
                                {card.expire_month}/
                                {card.expire_year}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#E6E6E6] bg-[#FAFAFA] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="h-11 rounded-[5px] border border-[#BDBDBD] px-6 text-sm font-bold text-[#737373] transition-colors hover:bg-white hover:text-[#252B42] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex h-11 items-center justify-center gap-2 rounded-[5px] bg-[#E74040] px-6 text-sm font-bold text-white transition-colors hover:bg-[#C93434] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                    >
                        {isDeleting && (
                            <LoaderCircle
                                aria-hidden="true"
                                className="h-5 w-5 animate-spin"
                            />
                        )}

                        {isDeleting
                            ? "Deleting..."
                            : "Delete Card"}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default DeleteCardModal;

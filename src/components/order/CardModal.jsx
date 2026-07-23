import { useEffect } from "react";
import { X } from "lucide-react";

import CardForm from "./CardForm";

function CardModal({
    isOpen,
    mode,
    card,
    isSubmitting,
    onSubmit,
    onClose,
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscapeKey = (event) => {
            if (event.key === "Escape" && !isSubmitting) {
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
    }, [isOpen, isSubmitting, onClose]);

    if (!isOpen) {
        return null;
    }

    const modalTitle =
        mode === "edit"
            ? "Edit Card"
            : "Add New Card";

    return (
        <div
            role="presentation"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isSubmitting
                ) {
                    onClose();
                }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6"
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="card-modal-title"
                className="max-h-full w-full max-w-[640px] overflow-y-auto rounded-xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E6E6E6] bg-white px-5 py-4 sm:px-7">
                    <div>
                        <h2
                            id="card-modal-title"
                            className="text-xl font-bold text-[#252B42]"
                        >
                            {modalTitle}
                        </h2>

                        <p className="mt-1 text-sm text-[#737373]">
                            Enter your card information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        aria-label="Close card form"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#F5F5F5] hover:text-[#252B42] disabled:cursor-not-allowed"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="p-5 sm:p-7">
                    <CardForm
                        key={card?.id ?? "new-card"}
                        initialValues={card}
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />
                </div>
            </section>
        </div>
    );
}

export default CardModal;

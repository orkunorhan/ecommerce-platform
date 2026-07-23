import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    CreditCard,
    LoaderCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
    createCard,
    deleteCard,
    updateCard,
} from "../../store/actions/clientActions";

import CardList from "./CardList";
import CardModal from "./CardModal";
import DeleteCardModal from "./DeleteCardModal";

function PaymentSection({
    cardList,
    cardFetchState,
    cardError,
    payment,
    onCardSelect,
    onCardSaved,
    onCardDeleted,
}) {
    const dispatch = useDispatch();

    const [isCardModalOpen, setIsCardModalOpen] =
        useState(false);

    const [modalMode, setModalMode] =
        useState("create");

    const [editingCard, setEditingCard] =
        useState(null);

    const [cardToDelete, setCardToDelete] =
        useState(null);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [deletingCardId, setDeletingCardId] =
        useState(null);

    const isLoading =
        cardFetchState === "idle" ||
        cardFetchState === "fetching";

    const openCreateModal = () => {
        setModalMode("create");
        setEditingCard(null);
        setIsCardModalOpen(true);
    };

    const openEditModal = (card) => {
        setModalMode("edit");
        setEditingCard(card);
        setIsCardModalOpen(true);
    };

    const closeCardModal = () => {
        if (isSubmitting) {
            return;
        }

        setIsCardModalOpen(false);
        setEditingCard(null);
    };

    const openDeleteModal = (card) => {
        setCardToDelete(card);
    };

    const closeDeleteModal = () => {
        if (deletingCardId !== null) {
            return;
        }

        setCardToDelete(null);
    };

    const handleSaveCard = async (cardData) => {
        try {
            setIsSubmitting(true);

            let savedCard;

            if (modalMode === "create") {
                savedCard = await dispatch(
                    createCard(cardData),
                );
            } else {
                savedCard = await dispatch(
                    updateCard({
                        ...cardData,
                        id: editingCard.id,
                    }),
                );
            }

            toast.success(
                modalMode === "create"
                    ? "Card added successfully."
                    : "Card updated successfully.",
            );

            onCardSaved?.(savedCard, modalMode);

            setIsCardModalOpen(false);
            setEditingCard(null);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while saving the card.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCard = async () => {
        if (!cardToDelete) {
            return;
        }

        const deletedCardId = cardToDelete.id;

        try {
            setDeletingCardId(deletedCardId);

            await dispatch(
                deleteCard(deletedCardId),
            );

            toast.success(
                "Card deleted successfully.",
            );

            onCardDeleted?.(deletedCardId);

            setCardToDelete(null);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while deleting the card.",
            );
        } finally {
            setDeletingCardId(null);
        }
    };

    return (
        <>
            <section className="rounded-lg border border-[#E6E6E6] bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                    <CreditCard
                        size={24}
                        aria-hidden="true"
                        className="shrink-0 text-[#23A6F0]"
                    />

                    <div>
                        <h2 className="text-xl font-bold text-[#252B42]">
                            Payment Method
                        </h2>

                        <p className="mt-1 text-sm text-[#737373]">
                            Select or manage one of your
                            saved cards.
                        </p>
                    </div>
                </div>

                {isLoading && (
                    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-[#737373]">
                        <LoaderCircle
                            aria-hidden="true"
                            className="h-5 w-5 animate-spin"
                        />

                        <span>
                            Loading saved cards...
                        </span>
                    </div>
                )}

                {cardFetchState === "failed" && (
                    <p
                        role="alert"
                        className="rounded-md border border-[#F5C2C2] bg-[#FFF1F1] px-4 py-3 text-sm text-[#E74040]"
                    >
                        {cardError ||
                            "Saved cards could not be loaded."}
                    </p>
                )}

                {cardFetchState === "fetched" && (
                    <CardList
                        cards={cardList}
                        selectedCard={
                            payment.selectedCard
                        }
                        deletingCardId={
                            deletingCardId
                        }
                        showAddCard={true}
                        onAdd={openCreateModal}
                        onSelect={onCardSelect}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                        radioGroupName="saved-card"
                    />
                )}
            </section>

            <CardModal
                isOpen={isCardModalOpen}
                mode={modalMode}
                card={editingCard}
                isSubmitting={isSubmitting}
                onSubmit={handleSaveCard}
                onClose={closeCardModal}
            />

            <DeleteCardModal
                isOpen={Boolean(cardToDelete)}
                card={cardToDelete}
                isDeleting={
                    deletingCardId !== null
                }
                onConfirm={handleDeleteCard}
                onClose={closeDeleteModal}
            />
        </>
    );
}

export default PaymentSection;

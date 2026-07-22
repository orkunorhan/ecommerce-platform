import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Info,
    LoaderCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
    createAddress,
    deleteAddress,
    updateAddress,
} from "../../store/actions/clientActions";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";
import DeleteAddressModal from "./DeleteAddressModal";

function AddressSection({
    addressList,
    addressFetchState,
    addressError,
    checkoutAddress,
    onShippingAddressSelect,
    onBillingAddressSelect,
    onSameAddressChange,
    onAddressSaved,
    onAddressDeleted,
}) {
    const dispatch = useDispatch();

    const [modalMode, setModalMode] = useState(null);
    const [editingAddress, setEditingAddress] =
        useState(null);
    const [isSubmitting, setIsSubmitting] =
        useState(false);
    const [deletingAddressId, setDeletingAddressId] =
        useState(null);
    const [
        addressPendingDeletion,
        setAddressPendingDeletion,
    ] = useState(null);

    const {
        shippingAddress,
        billingAddress,
        sameAddress,
    } = checkoutAddress;

    const isLoading =
        addressFetchState === "idle" ||
        addressFetchState === "fetching";

    const openCreateModal = () => {
        setEditingAddress(null);
        setModalMode("create");
    };

    const openEditModal = (address) => {
        setEditingAddress(address);
        setModalMode("edit");
    };

    const closeModal = () => {
        if (isSubmitting) {
            return;
        }

        setModalMode(null);
        setEditingAddress(null);
    };

    const handleAddressSubmit = async (formData) => {
        setIsSubmitting(true);

        try {
            let savedAddress;

            if (modalMode === "edit") {
                savedAddress = await dispatch(
                    updateAddress({
                        id: editingAddress.id,
                        ...formData,
                    }),
                );

                toast.success(
                    "Address updated successfully.",
                );
            } else {
                savedAddress = await dispatch(
                    createAddress(formData),
                );

                toast.success(
                    "Address added successfully.",
                );
            }

            onAddressSaved(savedAddress, modalMode);

            setModalMode(null);
            setEditingAddress(null);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Address could not be saved.";

            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openDeleteModal = (address) => {
        setAddressPendingDeletion(address);
    };

    const closeDeleteModal = () => {
        if (deletingAddressId !== null) {
            return;
        }

        setAddressPendingDeletion(null);
    };

    const handleAddressDelete = async () => {
        if (!addressPendingDeletion) {
            return;
        }

        const addressId =
            addressPendingDeletion.id;

        setDeletingAddressId(addressId);

        try {
            await dispatch(
                deleteAddress(addressId),
            );

            onAddressDeleted(addressId);

            toast.success(
                "Address deleted successfully.",
            );

            setAddressPendingDeletion(null);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Address could not be deleted.";

            toast.error(errorMessage);
        } finally {
            setDeletingAddressId(null);
        }
    };

    const addressListProps = {
        addresses: addressList,
        deletingAddressId,
        onEdit: openEditModal,
        onDelete: openDeleteModal,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-lg border border-[#BDE3FA] bg-[#F0F9FF] p-4 text-sm leading-6 text-[#252B42]">
                <Info
                    size={20}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#23A6F0]"
                />

                <p>
                    Select your shipping and billing addresses
                    before continuing to payment.
                </p>
            </div>

            <section className="rounded-lg border border-[#E6E6E6] bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-[#252B42]">
                        Shipping Address
                    </h2>

                    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#737373]">
                        <input
                            type="checkbox"
                            checked={sameAddress}
                            onChange={(event) =>
                                onSameAddressChange(
                                    event.target.checked,
                                )
                            }
                            className="h-5 w-5 cursor-pointer rounded border border-[#BDBDBD] accent-[#1c9be4]"
                        />

                        <span>
                            Use the same address for billing
                        </span>
                    </label>
                </div>

                {isLoading && (
                    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-[#737373]">
                        <LoaderCircle
                            aria-hidden="true"
                            className="h-5 w-5 animate-spin"
                        />

                        Loading saved addresses...
                    </div>
                )}

                {addressFetchState === "failed" && (
                    <p
                        role="alert"
                        className="rounded-md bg-[#FFF1F1] px-4 py-3 text-sm text-[#E74040]"
                    >
                        {addressError}
                    </p>
                )}

                {addressFetchState === "fetched" && (
                    <AddressList
                        {...addressListProps}
                        showAddCard
                        onAdd={openCreateModal}
                        selectedAddress={shippingAddress}
                        onSelect={
                            onShippingAddressSelect
                        }
                        radioGroupName="shipping-address"
                    />
                )}
            </section>

            {!sameAddress && (
                <section className="rounded-lg border border-[#E6E6E6] bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-5 text-xl font-bold text-[#252B42]">
                        Billing Address
                    </h2>

                    {isLoading && (
                        <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-[#737373]">
                            <LoaderCircle
                                aria-hidden="true"
                                className="h-5 w-5 animate-spin"
                            />

                            Loading saved addresses...
                        </div>
                    )}

                    {addressFetchState === "failed" && (
                        <p
                            role="alert"
                            className="rounded-md bg-[#FFF1F1] px-4 py-3 text-sm text-[#E74040]"
                        >
                            {addressError}
                        </p>
                    )}

                    {addressFetchState === "fetched" &&
                        addressList.length === 0 && (
                            <div className="rounded-lg border border-dashed border-[#E6E6E6] px-5 py-10 text-center">
                                <p className="text-sm text-[#737373]">
                                    Add an address before
                                    selecting a billing address.
                                </p>

                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="mt-4 text-sm font-bold text-[#23A6F0] hover:underline"
                                >
                                    Add New Address
                                </button>
                            </div>
                        )}

                    {addressFetchState === "fetched" &&
                        addressList.length > 0 && (
                            <AddressList
                                {...addressListProps}
                                selectedAddress={
                                    billingAddress
                                }
                                onSelect={
                                    onBillingAddressSelect
                                }
                                radioGroupName="billing-address"
                            />
                        )}
                </section>
            )}

            <AddressModal
                isOpen={Boolean(modalMode)}
                mode={modalMode}
                address={editingAddress}
                isSubmitting={isSubmitting}
                onSubmit={handleAddressSubmit}
                onClose={closeModal}
            />

            <DeleteAddressModal
                isOpen={Boolean(addressPendingDeletion)}
                address={addressPendingDeletion}
                isDeleting={deletingAddressId !== null}
                onConfirm={handleAddressDelete}
                onClose={closeDeleteModal}
            />
        </div>
    );
}

export default AddressSection;

import { Plus } from "lucide-react";

import AddressCard from "./AddressCard";

function AddressList({
    addresses,
    selectedAddress,
    deletingAddressId,
    showAddCard = false,
    onAdd,
    onSelect,
    onEdit,
    onDelete,
    radioGroupName,
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {showAddCard && (
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#E6E6E6] bg-white p-5 text-[#23A6F0] transition-colors hover:border-[#23A6F0] hover:bg-[#F0F9FF]"
                >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FD]">
                        <Plus
                            size={22}
                            aria-hidden="true"
                        />
                    </span>

                    <span className="text-sm font-bold">
                        Add New Address
                    </span>
                </button>
            )}

            {addresses.map((address) => (
                <AddressCard
                    key={address.id}
                    address={address}
                    selected={
                        selectedAddress?.id === address.id
                    }
                    isDeleting={
                        deletingAddressId === address.id
                    }
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    name={radioGroupName}
                />
            ))}
        </div>
    );
}

export default AddressList;

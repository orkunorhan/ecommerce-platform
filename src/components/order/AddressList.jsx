import AddressCard from "./AddressCard";

function AddressList({
    addresses,
    selectedAddress,
    deletingAddressId,
    onSelect,
    onEdit,
    onDelete,
    radioGroupName,
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
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

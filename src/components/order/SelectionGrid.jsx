import { Plus } from "lucide-react";

function SelectionGrid({
    children,
    showAddItem = false,
    addItemText,
    onAddItem,
}) {
    return (
        <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
            {showAddItem && (
                <button
                    type="button"
                    onClick={onAddItem}
                    className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#E6E6E6] bg-white p-5 text-[#23A6F0] transition-all hover:border-[#23A6F0] hover:bg-[#F0F9FF]"
                >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FD]">
                        <Plus
                            size={22}
                            aria-hidden="true"
                        />
                    </span>

                    <span className="text-sm font-bold">
                        {addItemText}
                    </span>
                </button>
            )}

            {children}
        </div>
    );
}

export default SelectionGrid;

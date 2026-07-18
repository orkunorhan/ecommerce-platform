import { Minus, Plus } from "lucide-react";

function CartQuantityControl({
    count,
    onDecrease,
    onIncrease,
}) {
    return (
        <div className="inline-flex h-10 items-center overflow-hidden rounded-md border border-[#E6E6E6] bg-white">
            <button
                type="button"
                onClick={onDecrease}
                disabled={count <= 1}
                aria-label="Decrease product quantity"
                className="flex h-full w-10 items-center justify-center text-[#737373] transition-colors hover:bg-[#F7F7F7] hover:text-[#252B42] disabled:cursor-not-allowed disabled:opacity-40"
            >
                <Minus
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden="true"
                />
            </button>

            <span
                aria-live="polite"
                className="flex h-full min-w-[44px] items-center justify-center border-x border-[#E6E6E6] px-2 text-sm font-bold text-[#252B42]"
            >
                {count}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                aria-label="Increase product quantity"
                className="flex h-full w-10 items-center justify-center text-[#737373] transition-colors hover:bg-[#F7F7F7] hover:text-[#252B42]"
            >
                <Plus
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}

export default CartQuantityControl;

import { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

import OrderSummary from "../components/cart/OrderSummary";
import AddressSection from "../components/order/AddressSection";
import OrderSteps from "../components/order/OrderSteps";
import { fetchAddresses } from "../store/actions/clientActions";
import { setAddress } from "../store/actions/shoppingCartActions";

const SHIPPING_PRICE = 29.99;
const DISCOUNT = 0;

function CreateOrderPage() {
    const dispatch = useDispatch();

    const addressList = useSelector(
        (state) => state.client.addressList,
    );

    const addressFetchState = useSelector(
        (state) => state.client.addressFetchState,
    );

    const addressError = useSelector(
        (state) => state.client.addressError,
    );

    const checkoutAddress = useSelector(
        (state) => state.shoppingCart.address,
    );

    const cart = useSelector(
        (state) => state.shoppingCart.cart,
    );

    const selectedCartItems = cart.filter(
        (cartItem) => cartItem.checked,
    );

    const selectedItemCount = selectedCartItems.reduce(
        (total, cartItem) =>
            total + cartItem.count,
        0,
    );

    const selectedTotalPrice =
        selectedCartItems.reduce(
            (total, cartItem) =>
                total +
                Number(
                    cartItem.product.price ?? 0,
                ) *
                cartItem.count,
            0,
        );

    const shippingPrice =
        selectedCartItems.length > 0
            ? SHIPPING_PRICE
            : 0;

    const grandTotal =
        selectedTotalPrice +
        shippingPrice -
        DISCOUNT;

    useEffect(() => {
        dispatch(fetchAddresses()).catch(() => {
            // Error state is managed in Redux.
        });
    }, [dispatch]);

    const handleShippingAddressSelect = (
        address,
    ) => {
        dispatch(
            setAddress({
                ...checkoutAddress,
                shippingAddress: address,
                billingAddress:
                    checkoutAddress.sameAddress
                        ? address
                        : checkoutAddress.billingAddress,
            }),
        );
    };

    const handleBillingAddressSelect = (
        address,
    ) => {
        dispatch(
            setAddress({
                ...checkoutAddress,
                billingAddress: address,
            }),
        );
    };

    const handleSameAddressChange = (
        sameAddress,
    ) => {
        dispatch(
            setAddress({
                ...checkoutAddress,
                sameAddress,
                billingAddress: sameAddress
                    ? checkoutAddress.shippingAddress
                    : null,
            }),
        );
    };

    const handleAddressSaved = (
        savedAddress,
        mode,
    ) => {
        if (mode === "create") {
            if (!checkoutAddress.shippingAddress) {
                dispatch(
                    setAddress({
                        ...checkoutAddress,
                        shippingAddress:
                            savedAddress,
                        billingAddress:
                            checkoutAddress.sameAddress
                                ? savedAddress
                                : checkoutAddress.billingAddress,
                    }),
                );
            }

            return;
        }

        const shippingAddressWasUpdated =
            checkoutAddress.shippingAddress?.id ===
            savedAddress.id;

        const billingAddressWasUpdated =
            checkoutAddress.billingAddress?.id ===
            savedAddress.id;

        dispatch(
            setAddress({
                ...checkoutAddress,
                shippingAddress:
                    shippingAddressWasUpdated
                        ? savedAddress
                        : checkoutAddress.shippingAddress,
                billingAddress:
                    billingAddressWasUpdated
                        ? savedAddress
                        : checkoutAddress.billingAddress,
            }),
        );
    };

    const handleAddressDeleted = (
        addressId,
    ) => {
        const shippingAddressWasDeleted =
            checkoutAddress.shippingAddress?.id ===
            addressId;

        const billingAddressWasDeleted =
            checkoutAddress.billingAddress?.id ===
            addressId;

        const nextShippingAddress =
            shippingAddressWasDeleted
                ? null
                : checkoutAddress.shippingAddress;

        let nextBillingAddress =
            billingAddressWasDeleted
                ? null
                : checkoutAddress.billingAddress;

        if (checkoutAddress.sameAddress) {
            nextBillingAddress =
                nextShippingAddress;
        }

        dispatch(
            setAddress({
                ...checkoutAddress,
                shippingAddress:
                    nextShippingAddress,
                billingAddress:
                    nextBillingAddress,
            }),
        );
    };

    const canContinue =
        selectedCartItems.length > 0 &&
        Boolean(
            checkoutAddress.shippingAddress,
        ) &&
        Boolean(
            checkoutAddress.billingAddress,
        );

    const handleContinue = () => {
        if (!canContinue) {
            return;
        }

        toast.info(
            "Payment options will be available in the next step.",
        );
    };

    if (selectedCartItems.length === 0) {
        return (
            <section className="flex w-full flex-1 items-center justify-center bg-[#FAFAFA] px-5 py-16">
                <div className="w-full max-w-[520px] rounded-xl border border-[#E6E6E6] bg-white px-6 py-10 text-center shadow-sm sm:px-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FD] text-[#23A6F0]">
                        <ShoppingCart
                            size={30}
                            aria-hidden="true"
                        />
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-[#252B42]">
                        No Products Selected
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#737373]">
                        Select at least one product from
                        your shopping cart before creating
                        an order.
                    </p>

                    <Link
                        to="/cart"
                        className="mt-7 inline-flex h-12 items-center justify-center rounded-[5px] bg-[#23A6F0] px-7 text-sm font-bold text-white transition-colors hover:bg-[#1B8ED1]"
                    >
                        Return to Shopping Cart
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="flex w-full flex-1 bg-[#FAFAFA] py-10 lg:py-14">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold leading-tight text-[#252B42]">
                        Create Order
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                        Select your delivery and billing
                        addresses to continue with payment.
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                    <div className="min-w-0 space-y-6">
                        <OrderSteps />

                        <AddressSection
                            addressList={addressList}
                            addressFetchState={
                                addressFetchState
                            }
                            addressError={addressError}
                            checkoutAddress={
                                checkoutAddress
                            }
                            onShippingAddressSelect={
                                handleShippingAddressSelect
                            }
                            onBillingAddressSelect={
                                handleBillingAddressSelect
                            }
                            onSameAddressChange={
                                handleSameAddressChange
                            }
                            onAddressSaved={
                                handleAddressSaved
                            }
                            onAddressDeleted={
                                handleAddressDeleted
                            }
                        />
                    </div>

                    <div className="xl:sticky xl:top-6">
                        <OrderSummary
                            productsTotal={
                                selectedTotalPrice
                            }
                            shippingPrice={
                                shippingPrice
                            }
                            discount={DISCOUNT}
                            grandTotal={grandTotal}
                            selectedItemCount={
                                selectedItemCount
                            }
                            buttonText="Save and Continue"
                            buttonDisabled={
                                !canContinue
                            }
                            onButtonClick={
                                handleContinue
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateOrderPage;

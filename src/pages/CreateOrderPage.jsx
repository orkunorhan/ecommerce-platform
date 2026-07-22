import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressSection from "../components/order/AddressSection";
import OrderSteps from "../components/order/OrderSteps";
import { fetchAddresses } from "../store/actions/clientActions";
import { setAddress } from "../store/actions/shoppingCartActions";

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

    useEffect(() => {
        dispatch(fetchAddresses()).catch(() => {
            // Error state is managed in Redux.
        });
    }, [dispatch]);

    const handleShippingAddressSelect = (address) => {
        dispatch(
            setAddress({
                ...checkoutAddress,
                shippingAddress: address,
                billingAddress: checkoutAddress.sameAddress
                    ? address
                    : checkoutAddress.billingAddress,
            }),
        );
    };

    const handleBillingAddressSelect = (address) => {
        dispatch(
            setAddress({
                ...checkoutAddress,
                billingAddress: address,
            }),
        );
    };

    const handleSameAddressChange = (sameAddress) => {
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

    const canContinue =
        Boolean(checkoutAddress.shippingAddress) &&
        Boolean(checkoutAddress.billingAddress);

    const handleAddressSaved = (savedAddress, mode) => {
        if (mode === "create") {
            if (!checkoutAddress.shippingAddress) {
                dispatch(
                    setAddress({
                        ...checkoutAddress,
                        shippingAddress: savedAddress,
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
                shippingAddress: shippingAddressWasUpdated
                    ? savedAddress
                    : checkoutAddress.shippingAddress,
                billingAddress: billingAddressWasUpdated
                    ? savedAddress
                    : checkoutAddress.billingAddress,
            }),
        );
    };

    const handleAddressDeleted = (addressId) => {
        const shippingAddressWasDeleted =
            checkoutAddress.shippingAddress?.id === addressId;

        const billingAddressWasDeleted =
            checkoutAddress.billingAddress?.id === addressId;

        const nextShippingAddress =
            shippingAddressWasDeleted
                ? null
                : checkoutAddress.shippingAddress;

        let nextBillingAddress =
            billingAddressWasDeleted
                ? null
                : checkoutAddress.billingAddress;

        if (checkoutAddress.sameAddress) {
            nextBillingAddress = nextShippingAddress;
        }

        dispatch(
            setAddress({
                ...checkoutAddress,
                shippingAddress: nextShippingAddress,
                billingAddress: nextBillingAddress,
            }),
        );
    };

    return (
        <section className="flex w-full flex-1 bg-[#FAFAFA] py-10 lg:py-14">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold leading-tight text-[#252B42]">
                        Create Order
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                        Select your delivery and billing addresses to
                        continue with payment.
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                    <div className="min-w-0 space-y-6">
                        <OrderSteps />

                        <AddressSection
                            addressList={addressList}
                            addressFetchState={addressFetchState}
                            addressError={addressError}
                            checkoutAddress={checkoutAddress}
                            onShippingAddressSelect={
                                handleShippingAddressSelect
                            }
                            onBillingAddressSelect={
                                handleBillingAddressSelect
                            }
                            onSameAddressChange={
                                handleSameAddressChange
                            }
                            onAddressSaved={handleAddressSaved}
                            onAddressDeleted={handleAddressDeleted}
                        />
                    </div>

                    <aside className="rounded-lg border border-[#E6E6E6] bg-white p-6 shadow-sm xl:sticky xl:top-6">
                        <h2 className="text-xl font-bold text-[#252B42]">
                            Order Summary
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-[#737373]">
                            Select your shipping and billing addresses to
                            continue.
                        </p>

                        <button
                            type="button"
                            disabled={!canContinue}
                            className="mt-6 h-12 w-full rounded-md bg-[#23A6F0] text-sm font-bold text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                        >
                            Save and Continue
                        </button>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default CreateOrderPage;

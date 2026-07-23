import {
    useEffect,
    useState,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ShoppingCart,
} from "lucide-react";
import { toast } from "react-toastify";

import OrderSummary from "../components/cart/OrderSummary";
import AddressSection from "../components/order/AddressSection";
import OrderSteps from "../components/order/OrderSteps";
import PaymentSection from "../components/order/PaymentSection";

import {
    fetchAddresses,
    fetchCards,
} from "../store/actions/clientActions";

import {
    setAddress,
    setPayment,
} from "../store/actions/shoppingCartActions";

const SHIPPING_PRICE = 29.99;
const DISCOUNT = 0;

function CreateOrderPage() {
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] =
        useState(1);

    const [
        hasAcceptedAgreements,
        setHasAcceptedAgreements,
    ] = useState(false);

    const addressList = useSelector(
        (state) => state.client.addressList,
    );

    const addressFetchState = useSelector(
        (state) =>
            state.client.addressFetchState,
    );

    const addressError = useSelector(
        (state) => state.client.addressError,
    );

    const cardList = useSelector(
        (state) => state.client.cardList,
    );

    const cardFetchState = useSelector(
        (state) =>
            state.client.cardFetchState,
    );

    const cardError = useSelector(
        (state) => state.client.cardError,
    );

    const checkoutAddress = useSelector(
        (state) =>
            state.shoppingCart.address,
    );

    const payment = useSelector(
        (state) =>
            state.shoppingCart.payment,
    );

    const cart = useSelector(
        (state) => state.shoppingCart.cart,
    );

    const selectedCartItems = cart.filter(
        (cartItem) => cartItem.checked,
    );

    const selectedItemCount =
        selectedCartItems.reduce(
            (total, cartItem) =>
                total + cartItem.count,
            0,
        );

    const selectedTotalPrice =
        selectedCartItems.reduce(
            (total, cartItem) =>
                total +
                Number(
                    cartItem.product.price ??
                    0,
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

    const hasValidAddresses =
        Boolean(
            checkoutAddress.shippingAddress,
        ) &&
        Boolean(
            checkoutAddress.billingAddress,
        );

    const hasSelectedCard = Boolean(
        payment.selectedCard,
    );

    const hasValidPayment =
        hasSelectedCard &&
        hasAcceptedAgreements;

    const canContinue =
        selectedCartItems.length > 0 &&
        (currentStep === 1
            ? hasValidAddresses
            : hasValidPayment);

    const summaryButtonText =
        currentStep === 1
            ? "Continue to Payment"
            : "Complete Order";

    const summaryHelperText =
        currentStep === 2
            ? "Order creation will be implemented in the next task."
            : null;

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                await dispatch(
                    fetchAddresses(),
                );
            } catch {
                // Address error is stored in Redux.
            }
        };

        loadAddresses();
    }, [dispatch]);

    useEffect(() => {
        if (
            currentStep !== 2 ||
            cardFetchState !== "idle"
        ) {
            return;
        }

        const loadCards = async () => {
            try {
                await dispatch(
                    fetchCards(),
                );
            } catch {
                // Card error is stored in Redux.
            }
        };

        loadCards();
    }, [
        currentStep,
        cardFetchState,
        dispatch,
    ]);

    const scrollToCheckoutTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleStepChange = (step) => {
        if (step === 1) {
            setCurrentStep(1);
            scrollToCheckoutTop();
            return;
        }

        if (
            step === 2 &&
            hasValidAddresses
        ) {
            setCurrentStep(2);
            scrollToCheckoutTop();
        }
    };

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
        const nextBillingAddress =
            sameAddress
                ? checkoutAddress.shippingAddress
                : null;

        dispatch(
            setAddress({
                ...checkoutAddress,
                sameAddress,
                billingAddress:
                    nextBillingAddress,
            }),
        );

        if (
            currentStep === 2 &&
            !nextBillingAddress
        ) {
            setCurrentStep(1);
        }
    };

    const handleAddressSaved = (
        savedAddress,
        mode,
    ) => {
        if (!savedAddress) {
            return;
        }

        if (mode === "create") {
            if (
                !checkoutAddress.shippingAddress
            ) {
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
            checkoutAddress
                .shippingAddress?.id ===
            savedAddress.id;

        const billingAddressWasUpdated =
            checkoutAddress
                .billingAddress?.id ===
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
            checkoutAddress
                .shippingAddress?.id ===
            addressId;

        const billingAddressWasDeleted =
            checkoutAddress
                .billingAddress?.id ===
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

        const addressesRemainValid =
            Boolean(nextShippingAddress) &&
            Boolean(nextBillingAddress);

        if (
            currentStep === 2 &&
            !addressesRemainValid
        ) {
            setCurrentStep(1);
        }
    };

    const handleCardSelect = (card) => {
        dispatch(
            setPayment({
                ...payment,
                selectedCard: card,
            }),
        );
    };

    const handleCardSaved = (
        savedCard,
        mode,
    ) => {
        if (!savedCard) {
            return;
        }

        const selectedCardWasUpdated =
            payment.selectedCard?.id ===
            savedCard.id;

        if (
            mode === "create" ||
            selectedCardWasUpdated
        ) {
            dispatch(
                setPayment({
                    ...payment,
                    selectedCard:
                        savedCard,
                }),
            );
        }
    };

    const handleCardDeleted = (
        cardId,
    ) => {
        const selectedCardWasDeleted =
            payment.selectedCard?.id ===
            cardId;

        if (!selectedCardWasDeleted) {
            return;
        }

        dispatch(
            setPayment({
                ...payment,
                selectedCard: null,
            }),
        );
    };

    const handleAgreementChange = (
        isAccepted,
    ) => {
        setHasAcceptedAgreements(
            isAccepted,
        );
    };

    const handleContinue = () => {
        if (!canContinue) {
            return;
        }

        if (currentStep === 1) {
            setCurrentStep(2);
            scrollToCheckoutTop();
            return;
        }

        toast.info(
            "Order creation will be implemented in the next task.",
        );
    };

    if (
        selectedCartItems.length === 0
    ) {
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
                        Select at least one
                        product from your shopping
                        cart before creating an
                        order.
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
                        {currentStep === 1
                            ? "Select your shipping and billing addresses to continue."
                            : "Select or add a credit card to complete your payment information."}
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
                    <div className="min-w-0 space-y-6">
                        <OrderSteps
                            currentStep={
                                currentStep
                            }
                            canAccessPayment={
                                hasValidAddresses
                            }
                            onStepChange={
                                handleStepChange
                            }
                        />

                        {currentStep === 1 && (
                            <AddressSection
                                addressList={
                                    addressList
                                }
                                addressFetchState={
                                    addressFetchState
                                }
                                addressError={
                                    addressError
                                }
                                checkoutAddress={
                                    checkoutAddress
                                }
                                showSelectionWarning={
                                    !hasValidAddresses
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
                        )}

                        {currentStep === 2 && (
                            <>
                                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#BDE3FA] bg-[#EAF6FD] px-4 py-4">
                                    <p className="text-sm text-[#252B42]">
                                        Your address
                                        information has
                                        been saved. Select
                                        a payment method to
                                        continue.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStepChange(
                                                1,
                                            )
                                        }
                                        className="inline-flex items-center gap-2 text-sm font-bold text-[#23A6F0] transition-colors hover:text-[#1B8ED1]"
                                    >
                                        <ArrowLeft
                                            size={16}
                                            aria-hidden="true"
                                        />

                                        Edit Addresses
                                    </button>
                                </div>

                                <PaymentSection
                                    cardList={
                                        cardList
                                    }
                                    cardFetchState={
                                        cardFetchState
                                    }
                                    cardError={
                                        cardError
                                    }
                                    payment={
                                        payment
                                    }
                                    onCardSelect={
                                        handleCardSelect
                                    }
                                    onCardSaved={
                                        handleCardSaved
                                    }
                                    onCardDeleted={
                                        handleCardDeleted
                                    }
                                />
                            </>
                        )}
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
                            grandTotal={
                                grandTotal
                            }
                            selectedItemCount={
                                selectedItemCount
                            }
                            buttonText={
                                summaryButtonText
                            }
                            buttonDisabled={
                                !canContinue
                            }
                            onButtonClick={
                                handleContinue
                            }
                            helperText={
                                summaryHelperText
                            }
                            showAgreement={
                                currentStep === 2
                            }
                            agreementAccepted={
                                hasAcceptedAgreements
                            }
                            onAgreementChange={
                                handleAgreementChange
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateOrderPage;

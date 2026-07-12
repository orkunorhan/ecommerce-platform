import FormField from "./FormField";

const TURKISH_PHONE_PATTERN = /^(?:\+90|0)?5\d{9}$/;
const TAX_NUMBER_PATTERN = /^T\d{4}V\d{6}$/;
const TURKISH_IBAN_PATTERN = /^TR\d{24}$/;

function StoreFields({ register, errors }) {
    return (
        <div className="rounded-xl border border-[#BDE3FF] bg-[#F7FBFF] p-5 sm:p-6">
            <div>
                <h2 className="text-base font-bold leading-6 tracking-[0.1px] text-[#252B42]">
                    Store Information
                </h2>

                <p className="mt-1 text-sm leading-5 tracking-[0.2px] text-[#737373]">
                    Enter the required information for your store account.
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-5">
                <FormField
                    id="storeName"
                    label="Store Name *"
                    placeholder="Your Store Name"
                    autoComplete="organization"
                    registration={register("store.name", {
                        required: "Store name is required.",
                        validate: (value) =>
                            value.trim().length >= 3 ||
                            "Store name must be at least 3 characters.",
                    })}
                    error={errors.store?.name}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormField
                        id="storePhone"
                        label="Store Phone *"
                        type="tel"
                        placeholder="0 (5xx) xxx xx xx"
                        autoComplete="tel"
                        registration={register("store.phone", {
                            required: "Store phone is required.",
                            pattern: {
                                value: TURKISH_PHONE_PATTERN,
                                message:
                                    "Enter a valid Türkiye mobile phone number.",
                            },
                        })}
                        error={errors.store?.phone}
                    />

                    <FormField
                        id="storeTaxNumber"
                        label="Store Tax Number *"
                        placeholder="TxxxxVxxxxxx"
                        registration={register("store.tax_no", {
                            required: "Store tax number is required.",
                            setValueAs: (value) =>
                                value.replace(/\s+/g, "").toUpperCase(),
                            pattern: {
                                value: TAX_NUMBER_PATTERN,
                                message:
                                    "Tax number must match TXXXXVXXXXXX.",
                            },
                        })}
                        error={errors.store?.tax_no}
                    />
                </div>

                <FormField
                    id="storeBankAccount"
                    label="Store Bank Account *"
                    placeholder="TRxx xxxx xxxx xxxx xxxx xxxx xx"
                    autoComplete="off"
                    registration={register("store.bank_account", {
                        required: "Store bank account is required.",
                        setValueAs: (value) =>
                            value.replace(/\s+/g, "").toUpperCase(),
                        pattern: {
                            value: TURKISH_IBAN_PATTERN,
                            message:
                                "Enter a valid Türkiye IBAN address.",
                        },
                    })}
                    error={errors.store?.bank_account}
                />
            </div>
        </div>
    );
}

export default StoreFields;

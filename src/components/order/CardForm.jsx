import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
    CreditCard,
    LoaderCircle,
    UserRound,
} from "lucide-react";

const CARD_NUMBER_LENGTH = 16;
const FUTURE_YEAR_RANGE = 15;

function normalizeCardNumber(value = "") {
    return value.replace(/\D/g, "").slice(
        0,
        CARD_NUMBER_LENGTH,
    );
}

function formatCardNumber(value = "") {
    return normalizeCardNumber(value)
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
}

function CardForm({
    initialValues = null,
    isSubmitting,
    onSubmit,
    onCancel,
}) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const expirationYears = useMemo(
        () =>
            Array.from(
                { length: FUTURE_YEAR_RANGE + 1 },
                (_, index) => currentYear + index,
            ),
        [currentYear],
    );

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name_on_card:
                initialValues?.name_on_card ?? "",
            card_no: formatCardNumber(
                initialValues?.card_no ?? "",
            ),
            expire_month:
                initialValues?.expire_month?.toString() ??
                "",
            expire_year:
                initialValues?.expire_year?.toString() ??
                "",
        },
    });

    const selectedExpireMonth = useWatch({
        control,
        name: "expire_month",
    });

    const selectedExpireYear = useWatch({
        control,
        name: "expire_year",
    });

    const handleCardNumberChange = (event) => {
        setValue(
            "card_no",
            formatCardNumber(event.target.value),
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );
    };

    const submitForm = (formData) => {
        const normalizedCardNumber =
            normalizeCardNumber(formData.card_no);

        onSubmit({
            card_no: normalizedCardNumber,
            expire_month: Number(
                formData.expire_month,
            ),
            expire_year: Number(formData.expire_year),
            name_on_card:
                formData.name_on_card.trim(),
        });
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(submitForm)}
            className="space-y-6"
        >
            <div>
                <label
                    htmlFor="name-on-card"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Name on Card
                </label>

                <div className="relative">
                    <UserRound
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                        id="name-on-card"
                        type="text"
                        autoComplete="cc-name"
                        placeholder="Name Surname"
                        disabled={isSubmitting}
                        aria-invalid={
                            errors.name_on_card
                                ? "true"
                                : "false"
                        }
                        {...register("name_on_card", {
                            required:
                                "Name on card is required.",
                            validate: {
                                notOnlyWhitespace: (
                                    value,
                                ) =>
                                    value.trim().length >
                                    0 ||
                                    "Name on card is required.",
                                minimumLength: (
                                    value,
                                ) =>
                                    value.trim().length >=
                                    3 ||
                                    "Name on card must be at least 3 characters.",
                                validCharacters: (
                                    value,
                                ) =>
                                    /^[\p{L}\s.'-]+$/u.test(
                                        value.trim(),
                                    ) ||
                                    "Name on card contains invalid characters.",
                            },
                        })}
                        className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] pl-11 pr-4 text-sm text-[#252B42] outline-none transition-colors placeholder:text-[#BDBDBD] focus:bg-white ${errors.name_on_card
                            ? "border-[#E74040] focus:border-[#E74040]"
                            : "border-[#E6E6E6] focus:border-[#23A6F0]"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                </div>

                {errors.name_on_card && (
                    <p
                        role="alert"
                        className="mt-2 text-xs font-semibold text-[#E74040]"
                    >
                        {errors.name_on_card.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="card-number"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Card Number
                </label>

                <div className="relative">
                    <CreditCard
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                    />

                    <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="xxxx xxxx xxxx xxxx"
                        maxLength={19}
                        disabled={isSubmitting}
                        aria-invalid={
                            errors.card_no
                                ? "true"
                                : "false"
                        }
                        {...register("card_no", {
                            required:
                                "Card number is required.",
                            validate: {
                                numeric: (value) =>
                                    /^\d{16}$/.test(
                                        normalizeCardNumber(
                                            value,
                                        ),
                                    ) ||
                                    "Card number must contain exactly 16 digits.",
                            },
                            onChange:
                                handleCardNumberChange,
                        })}
                        className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] pl-11 pr-4 text-sm tracking-[0.08em] text-[#252B42] outline-none transition-colors placeholder:tracking-normal placeholder:text-[#BDBDBD] focus:bg-white ${errors.card_no
                            ? "border-[#E74040] focus:border-[#E74040]"
                            : "border-[#E6E6E6] focus:border-[#23A6F0]"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                </div>

                {errors.card_no && (
                    <p
                        role="alert"
                        className="mt-2 text-xs font-semibold text-[#E74040]"
                    >
                        {errors.card_no.message}
                    </p>
                )}
            </div>

            <div>
                <p className="mb-2 text-sm font-bold text-[#252B42]">
                    Expiration Date
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="expire-month"
                            className="sr-only"
                        >
                            Expiration month
                        </label>

                        <select
                            id="expire-month"
                            autoComplete="cc-exp-month"
                            disabled={isSubmitting}
                            aria-invalid={
                                errors.expire_month
                                    ? "true"
                                    : "false"
                            }
                            {...register(
                                "expire_month",
                                {
                                    required:
                                        "Expiration month is required.",
                                    validate: {
                                        validMonth: (
                                            value,
                                        ) => {
                                            const month =
                                                Number(
                                                    value,
                                                );

                                            return (
                                                (month >=
                                                    1 &&
                                                    month <=
                                                    12) ||
                                                "Select a valid expiration month."
                                            );
                                        },
                                        notExpired: (
                                            value,
                                        ) => {
                                            const month =
                                                Number(
                                                    value,
                                                );
                                            const year =
                                                Number(
                                                    selectedExpireYear,
                                                );

                                            if (
                                                !year ||
                                                year >
                                                currentYear
                                            ) {
                                                return true;
                                            }

                                            return (
                                                month >=
                                                currentMonth ||
                                                "This card has expired."
                                            );
                                        },
                                    },
                                },
                            )}
                            className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] px-4 text-sm text-[#252B42] outline-none transition-colors focus:bg-white ${errors.expire_month
                                ? "border-[#E74040] focus:border-[#E74040]"
                                : "border-[#E6E6E6] focus:border-[#23A6F0]"
                                } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                            <option value="">
                                Month
                            </option>

                            {Array.from(
                                { length: 12 },
                                (_, index) => {
                                    const month =
                                        index + 1;
                                    const monthValue =
                                        month.toString();

                                    return (
                                        <option
                                            key={
                                                monthValue
                                            }
                                            value={
                                                monthValue
                                            }
                                        >
                                            {monthValue.padStart(
                                                2,
                                                "0",
                                            )}
                                        </option>
                                    );
                                },
                            )}
                        </select>

                        {errors.expire_month && (
                            <p
                                role="alert"
                                className="mt-2 text-xs font-semibold text-[#E74040]"
                            >
                                {
                                    errors
                                        .expire_month
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="expire-year"
                            className="sr-only"
                        >
                            Expiration year
                        </label>

                        <select
                            id="expire-year"
                            autoComplete="cc-exp-year"
                            disabled={isSubmitting}
                            aria-invalid={
                                errors.expire_year
                                    ? "true"
                                    : "false"
                            }
                            {...register(
                                "expire_year",
                                {
                                    required:
                                        "Expiration year is required.",
                                    validate: {
                                        validYear: (
                                            value,
                                        ) =>
                                            Number(
                                                value,
                                            ) >=
                                            currentYear ||
                                            "Select a valid expiration year.",
                                        notExpired: (
                                            value,
                                        ) => {
                                            const year =
                                                Number(
                                                    value,
                                                );
                                            const month =
                                                Number(
                                                    selectedExpireMonth,
                                                );

                                            if (
                                                !month ||
                                                year >
                                                currentYear
                                            ) {
                                                return true;
                                            }

                                            return (
                                                month >=
                                                currentMonth ||
                                                "This card has expired."
                                            );
                                        },
                                    },
                                },
                            )}
                            className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] px-4 text-sm text-[#252B42] outline-none transition-colors focus:bg-white ${errors.expire_year
                                ? "border-[#E74040] focus:border-[#E74040]"
                                : "border-[#E6E6E6] focus:border-[#23A6F0]"
                                } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                            <option value="">
                                Year
                            </option>

                            {expirationYears.map(
                                (year) => (
                                    <option
                                        key={year}
                                        value={year}
                                    >
                                        {year}
                                    </option>
                                ),
                            )}
                        </select>

                        {errors.expire_year && (
                            <p
                                role="alert"
                                className="mt-2 text-xs font-semibold text-[#E74040]"
                            >
                                {
                                    errors
                                        .expire_year
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md border border-[#BDE3FA] bg-[#F0F9FF] px-4 py-3">
                <p className="text-xs leading-5 text-[#737373]">
                    Your card security code is not stored.
                    Only the information required by the
                    saved-card service will be submitted.
                </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#E6E6E6] pt-5 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="h-11 rounded-[5px] border border-[#BDBDBD] px-6 text-sm font-bold text-[#737373] transition-colors hover:bg-[#FAFAFA] hover:text-[#252B42] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-11 items-center justify-center gap-2 rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                >
                    {isSubmitting && (
                        <LoaderCircle
                            aria-hidden="true"
                            className="h-5 w-5 animate-spin"
                        />
                    )}

                    {isSubmitting
                        ? "Saving..."
                        : initialValues
                            ? "Update Card"
                            : "Save Card"}
                </button>
            </div>
        </form>
    );
}

export default CardForm;

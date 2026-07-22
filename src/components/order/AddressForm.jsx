import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import turkishCities from "../../constants/turkishCities";

const PHONE_PATTERN = /^0\d{10}$/;

const emptyAddressValues = {
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
};

function AddressForm({
    initialValues,
    isSubmitting,
    onSubmit,
    onCancel,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: initialValues ?? emptyAddressValues,
    });

    const handleFormSubmit = (formData) => {
        onSubmit({
            title: formData.title.trim(),
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            phone: formData.phone.trim(),
            city: formData.city,
            district: formData.district.trim(),
            neighborhood: formData.neighborhood.trim(),
            address: formData.address.trim(),
        });
    };

    const inputClassName = (hasError) =>
        `h-12 w-full rounded-[5px] border bg-[#F9F9F9] px-4 text-sm text-[#252B42] outline-none transition-colors placeholder:text-[#9A9A9A] ${hasError
            ? "border-[#E74040] focus:border-[#E74040]"
            : "border-[#E6E6E6] focus:border-[#23A6F0]"
        }`;

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="space-y-5"
        >
            <div>
                <label
                    htmlFor="address-title"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Address Title *
                </label>

                <input
                    id="address-title"
                    type="text"
                    placeholder="Home, Office..."
                    {...register("title", {
                        required: "Address title is required.",
                        minLength: {
                            value: 2,
                            message:
                                "Address title must contain at least 2 characters.",
                        },
                    })}
                    className={inputClassName(errors.title)}
                />

                {errors.title && (
                    <p className="mt-1 text-xs text-[#E74040]">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="address-name"
                        className="mb-2 block text-sm font-bold text-[#252B42]"
                    >
                        Name *
                    </label>

                    <input
                        id="address-name"
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: "Name is required.",
                            minLength: {
                                value: 2,
                                message:
                                    "Name must contain at least 2 characters.",
                            },
                        })}
                        className={inputClassName(errors.name)}
                    />

                    {errors.name && (
                        <p className="mt-1 text-xs text-[#E74040]">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address-surname"
                        className="mb-2 block text-sm font-bold text-[#252B42]"
                    >
                        Surname *
                    </label>

                    <input
                        id="address-surname"
                        type="text"
                        placeholder="Surname"
                        {...register("surname", {
                            required: "Surname is required.",
                            minLength: {
                                value: 2,
                                message:
                                    "Surname must contain at least 2 characters.",
                            },
                        })}
                        className={inputClassName(errors.surname)}
                    />

                    {errors.surname && (
                        <p className="mt-1 text-xs text-[#E74040]">
                            {errors.surname.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor="address-phone"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Phone *
                </label>

                <input
                    id="address-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="05XXXXXXXXX"
                    {...register("phone", {
                        required: "Phone number is required.",
                        pattern: {
                            value: PHONE_PATTERN,
                            message:
                                "Enter an 11-digit phone number starting with 0.",
                        },
                    })}
                    className={inputClassName(errors.phone)}
                />

                {errors.phone && (
                    <p className="mt-1 text-xs text-[#E74040]">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="address-city"
                        className="mb-2 block text-sm font-bold text-[#252B42]"
                    >
                        City *
                    </label>

                    <select
                        id="address-city"
                        {...register("city", {
                            required: "City is required.",
                        })}
                        className={inputClassName(errors.city)}
                    >
                        <option value="">Select a city</option>

                        {turkishCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    {errors.city && (
                        <p className="mt-1 text-xs text-[#E74040]">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address-district"
                        className="mb-2 block text-sm font-bold text-[#252B42]"
                    >
                        District *
                    </label>

                    <input
                        id="address-district"
                        type="text"
                        placeholder="District"
                        {...register("district", {
                            required: "District is required.",
                            minLength: {
                                value: 2,
                                message:
                                    "District must contain at least 2 characters.",
                            },
                        })}
                        className={inputClassName(errors.district)}
                    />

                    {errors.district && (
                        <p className="mt-1 text-xs text-[#E74040]">
                            {errors.district.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor="address-neighborhood"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Neighborhood *
                </label>

                <input
                    id="address-neighborhood"
                    type="text"
                    placeholder="Neighborhood"
                    {...register("neighborhood", {
                        required: "Neighborhood is required.",
                        minLength: {
                            value: 2,
                            message:
                                "Neighborhood must contain at least 2 characters.",
                        },
                    })}
                    className={inputClassName(
                        errors.neighborhood,
                    )}
                />

                {errors.neighborhood && (
                    <p className="mt-1 text-xs text-[#E74040]">
                        {errors.neighborhood.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="address-details"
                    className="mb-2 block text-sm font-bold text-[#252B42]"
                >
                    Address Details *
                </label>

                <textarea
                    id="address-details"
                    rows={4}
                    placeholder="Street, building and apartment information"
                    {...register("address", {
                        required: "Address details are required.",
                        minLength: {
                            value: 5,
                            message:
                                "Address details must contain at least 5 characters.",
                        },
                    })}
                    className={`w-full resize-none rounded-[5px] border bg-[#F9F9F9] px-4 py-3 text-sm leading-6 text-[#252B42] outline-none transition-colors placeholder:text-[#9A9A9A] ${errors.address
                        ? "border-[#E74040] focus:border-[#E74040]"
                        : "border-[#E6E6E6] focus:border-[#23A6F0]"
                        }`}
                />

                {errors.address && (
                    <p className="mt-1 text-xs text-[#E74040]">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#E6E6E6] pt-5 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="h-11 rounded-[5px] border border-[#23A6F0] px-6 text-sm font-bold text-[#23A6F0] transition-colors hover:bg-[#EAF6FD] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="flex h-11 items-center justify-center gap-2 rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                >
                    {isSubmitting && (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                    )}

                    {isSubmitting
                        ? "Saving..."
                        : "Save Address"}
                </button>
            </div>
        </form>
    );
}

export default AddressForm;

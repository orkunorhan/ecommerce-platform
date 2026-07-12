import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function FormField({
    id,
    label,
    type = "text",
    placeholder,
    registration,
    error,
    autoComplete,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";

    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="mb-2 text-sm font-bold leading-5 tracking-[0.1px] text-[#252B42]"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={
                        isPasswordField
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...registration}
                    className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] px-4 pr-12 text-sm text-[#252B42] outline-none transition-colors placeholder:text-[#9A9A9A] ${error
                            ? "border-[#E74040] focus:border-[#E74040]"
                            : "border-[#E6E6E6] focus:border-[#23A6F0]"
                        }`}
                />

                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((previous) => !previous)
                        }
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#737373] transition-colors hover:text-[#252B42]"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p
                    role="alert"
                    className="mt-1 text-xs leading-5 text-[#E74040]"
                >
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default FormField;

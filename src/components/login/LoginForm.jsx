import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (formData) => {
        console.log("Validated login form:", formData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
        >
            <div className="flex flex-col">
                <label
                    htmlFor="email"
                    className="mb-2 text-sm font-bold leading-5 tracking-[0.1px] text-[#252B42]"
                >
                    Email Address *
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    autoComplete="email"
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: EMAIL_PATTERN,
                            message: "Please enter a valid email address.",
                        },
                    })}
                    className={`h-12 rounded-[5px] border bg-[#F9F9F9] px-4 text-sm text-[#252B42] outline-none transition-colors placeholder:text-[#9A9A9A] ${errors.email
                            ? "border-[#E74040] focus:border-[#E74040]"
                            : "border-[#E6E6E6] focus:border-[#23A6F0]"
                        }`}
                />

                {errors.email && (
                    <p
                        role="alert"
                        className="mt-1 text-xs leading-5 text-[#E74040]"
                    >
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="password"
                    className="mb-2 text-sm font-bold leading-5 tracking-[0.1px] text-[#252B42]"
                >
                    Password *
                </label>

                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required.",
                        })}
                        className={`h-12 w-full rounded-[5px] border bg-[#F9F9F9] px-4 pr-12 text-sm text-[#252B42] outline-none transition-colors placeholder:text-[#9A9A9A] ${errors.password
                                ? "border-[#E74040] focus:border-[#E74040]"
                                : "border-[#E6E6E6] focus:border-[#23A6F0]"
                            }`}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((previous) => !previous)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#737373] transition-colors hover:text-[#252B42]"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {errors.password && (
                    <p
                        role="alert"
                        className="mt-1 text-xs leading-5 text-[#E74040]"
                    >
                        {errors.password.message}
                    </p>
                )}
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-[#737373]">
                <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="h-4 w-4 rounded border-[#BDBDBD] accent-[#23A6F0]"
                />

                <span>Remember me</span>
            </label>

            <button
                type="submit"
                disabled={!isValid}
                className="mt-1 flex h-[52px] w-full items-center justify-center rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold tracking-[0.2px] text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;

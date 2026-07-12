import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import FormField from "../components/signup/FormField";
import RoleSelect from "../components/signup/RoleSelect";
import StoreFields from "../components/signup/StoreFields";

const PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function SignupPage() {
    const history = useHistory();

    const [roles, setRoles] = useState([]);
    const [isRolesLoading, setIsRolesLoading] = useState(true);
    const [rolesError, setRolesError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        control,
        trigger,
        unregister,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldUnregister: true,
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            role_id: 3,
        },
    });

    const password = useWatch({
        control,
        name: "password",
    });

    const passwordConfirm = useWatch({
        control,
        name: "passwordConfirm",
    });

    const selectedRoleId = useWatch({
        control,
        name: "role_id",
    });

    const selectedRole = roles.find(
        (role) => role.id === Number(selectedRoleId),
    );

    const isStoreRole = selectedRole?.code === "store";

    useEffect(() => {
        if (passwordConfirm) {
            trigger("passwordConfirm");
        }
    }, [password, passwordConfirm, trigger]);

    useEffect(() => {
        if (!isStoreRole) {
            unregister("store");
        }
    }, [isStoreRole, unregister]);

    useEffect(() => {
        let isMounted = true;

        const fetchRoles = async () => {
            try {
                setIsRolesLoading(true);
                setRolesError("");

                const response = await axiosInstance.get("/roles");

                if (!isMounted) {
                    return;
                }

                const sortedRoles = [...response.data].sort(
                    (firstRole, secondRole) => {
                        if (firstRole.code === "customer") {
                            return -1;
                        }

                        if (secondRole.code === "customer") {
                            return 1;
                        }

                        return firstRole.id - secondRole.id;
                    },
                );

                setRoles(sortedRoles);
            } catch {
                if (isMounted) {
                    setRolesError(
                        "Roles could not be loaded. Please refresh the page.",
                    );
                }
            } finally {
                if (isMounted) {
                    setIsRolesLoading(false);
                }
            }
        };

        fetchRoles();

        return () => {
            isMounted = false;
        };
    }, []);

    const redirectToPreviousPage = () => {
        if (history.length > 1) {
            history.goBack();
            return;
        }

        history.push("/");
    };

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        setSubmitError("");

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role_id: Number(formData.role_id),
        };

        if (isStoreRole) {
            payload.store = {
                name: formData.store.name.trim(),
                phone: formData.store.phone,
                tax_no: formData.store.tax_no,
                bank_account: formData.store.bank_account,
            };
        }

        try {
            await axiosInstance.post("/signup", payload);

            setIsSubmitting(false);

            toast.warning(
                "You need to click link in email to activate your account!",
            );

            redirectToPreviousPage();
        } catch (error) {
            const backendError =
                error.response?.data?.err?.code === "SQLITE_CONSTRAINT"
                    ? "This email address is already registered."
                    : error.response?.data?.error ||
                    "Registration failed. Please try again.";

            setSubmitError(backendError);
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#FAFAFA] px-5 py-14">
            <section className="w-full max-w-[480px] overflow-hidden rounded-[12px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="border-b border-[#F1F1F1] px-6 py-7 text-center sm:px-8">
                    <h1 className="text-[28px] font-bold leading-9 tracking-[0.1px] text-[#252B42]">
                        Become a Member
                    </h1>

                    <p className="mt-2 text-sm leading-6 tracking-[0.2px] text-[#737373]">
                        Join us and start shopping with exclusive deals.
                    </p>
                </div>

                <div className="px-6 py-8 sm:px-8">
                    {rolesError && (
                        <div
                            role="alert"
                            className="mb-6 rounded-[5px] border border-[#E74040] bg-[#FFF1F1] px-4 py-3 text-sm text-[#E74040]"
                        >
                            {rolesError}
                        </div>
                    )}



                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="flex flex-col gap-5"
                    >
                        <FormField
                            id="name"
                            label="Full Name *"
                            placeholder="Your Full Name"
                            autoComplete="name"
                            registration={register("name", {
                                required: "Name is required.",
                                validate: (value) =>
                                    value.trim().length >= 3 ||
                                    "Name must be at least 3 characters.",
                            })}
                            error={errors.name}
                        />

                        <FormField
                            id="email"
                            label="Email Address *"
                            type="email"
                            placeholder="example@mail.com"
                            autoComplete="email"
                            registration={register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Please enter a valid email address.",
                                },
                            })}
                            error={errors.email}
                        />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <FormField
                                id="password"
                                label="Password *"
                                type="password"
                                placeholder="Enter password"
                                autoComplete="new-password"
                                registration={register("password", {
                                    required: "Password is required.",
                                    pattern: {
                                        value: PASSWORD_PATTERN,
                                        message:
                                            "Use at least 8 characters with uppercase, lowercase, number and special character.",
                                    },
                                })}
                                error={errors.password}
                            />

                            <FormField
                                id="passwordConfirm"
                                label="Confirm Password *"
                                type="password"
                                placeholder="Repeat password"
                                autoComplete="new-password"
                                registration={register(
                                    "passwordConfirm",
                                    {
                                        required:
                                            "Please confirm your password.",
                                        validate: (value) =>
                                            value === password ||
                                            "Passwords do not match.",
                                    },
                                )}
                                error={errors.passwordConfirm}
                            />
                        </div>

                        <RoleSelect
                            roles={roles}
                            isLoading={isRolesLoading}
                            registration={register("role_id", {
                                required: "Role is required.",
                                valueAsNumber: true,
                            })}
                            error={errors.role_id}
                        />

                        {isStoreRole && (
                            <StoreFields
                                register={register}
                                errors={errors}
                            />
                        )}

                        <button
                            type="submit"
                            disabled={
                                !isValid ||
                                isRolesLoading ||
                                Boolean(rolesError) ||
                                isSubmitting
                            }
                            className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#23A6F0] px-6 text-sm font-bold tracking-[0.2px] text-white transition-colors hover:bg-[#1B8ED1] disabled:cursor-not-allowed disabled:bg-[#BDBDBD]"
                        >
                            {isSubmitting && (
                                <LoaderCircle
                                    aria-hidden="true"
                                    className="h-5 w-5 animate-spin"
                                />
                            )}

                            {isSubmitting
                                ? "Creating Account..."
                                : "Join Now"}
                        </button>
                    </form>

                    {submitError && (
                        <div
                            role="alert"
                            className="mt-3 mb-6 rounded-[5px] border border-[#E74040] bg-[#FFF1F1] px-4 py-3 text-sm leading-5 text-[#E74040]"
                        >
                            {submitError}
                        </div>
                    )}

                    <p className="mt-7 text-center text-sm italic text-[#737373]">
                        Already a member?{" "}
                        <Link
                            to="/login"
                            className="font-semibold not-italic text-[#23A6F0] hover:underline"
                        >
                            Login to your account
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default SignupPage;

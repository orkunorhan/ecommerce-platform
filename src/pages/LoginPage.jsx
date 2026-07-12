import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

function LoginPage() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#FAFAFA] px-5 py-14">
            <section className="w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="border-b border-[#F1F1F1] px-6 py-7 text-center sm:px-8">
                    <h1 className="text-[28px] font-bold leading-9 tracking-[0.1px] text-[#252B42]">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm leading-6 tracking-[0.2px] text-[#737373]">
                        Login to continue shopping.
                    </p>
                </div>

                <div className="px-6 py-8 sm:px-8">
                    <LoginForm />

                    <p className="mt-7 text-center text-sm italic text-[#737373]">
                        Not a member yet?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold not-italic text-[#23A6F0] hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;

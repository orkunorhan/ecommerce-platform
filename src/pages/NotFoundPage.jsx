import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-slate-900">404</h1>

            <p className="text-slate-500">
                The page you are looking for does not exist.
            </p>

            <Link to="/" className="text-sm font-bold text-slate-900 underline">
                Back to Home
            </Link>
        </section>
    );
}

export default NotFoundPage;

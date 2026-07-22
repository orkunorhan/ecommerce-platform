import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({
    component: Component,
    ...routeProps
}) {
    const user = useSelector((state) => state.client.user);

    const authChecked = useSelector(
        (state) => state.client.authChecked,
    );

    return (
        <Route
            {...routeProps}
            render={(routerProps) => {
                if (!authChecked) {
                    return (
                        <div className="flex min-h-[50vh] items-center justify-center">
                            <div
                                aria-label="Loading"
                                className="h-10 w-10 animate-spin rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0]"
                            />
                        </div>
                    );
                }

                if (!user.token) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: routerProps.location,
                                },
                            }}
                        />
                    );
                }

                return <Component {...routerProps} />;
            }}
        />
    );
}

export default ProtectedRoute;

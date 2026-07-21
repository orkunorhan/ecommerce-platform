import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const previousScrollRestoration =
            window.history.scrollRestoration;

        window.history.scrollRestoration = "manual";

        return () => {
            window.history.scrollRestoration =
                previousScrollRestoration;
        };
    }, []);

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.key]);

    return null;
}

export default ScrollToTop;

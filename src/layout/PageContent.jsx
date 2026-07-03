import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../pages/ShopPage";

function PageContent() {
    return (
        <main className="flex flex-1 flex-col">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/shop" component={ShopPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    );
}

export default PageContent;

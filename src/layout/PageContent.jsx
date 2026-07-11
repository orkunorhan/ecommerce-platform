import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";

function PageContent() {
    return (
        <main className="flex flex-1 flex-col">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/shop" component={ShopPage} />
                <Route
                    exact
                    path="/product/:productId"
                    component={ProductDetailPage}
                />
                <Route
                    exact
                    path="/contact"
                    component={ContactPage} />
                <Route exact path="/team" component={TeamPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    );
}

export default PageContent;

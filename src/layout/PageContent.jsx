import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import CreateOrderPage from "../pages/CreateOrderPage";

function PageContent() {
    return (
        <main className="flex flex-1 flex-col">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                    exact
                    path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
                    component={ProductDetailPage}
                />
                <Route
                    exact
                    path="/shop/:gender/:categoryName/:categoryId"
                    component={ShopPage}
                />
                <Route exact path="/shop" component={ShopPage} />
                <Route exact path="/cart" component={ShoppingCartPage} />
                <ProtectedRoute
                    exact
                    path="/order"
                    component={CreateOrderPage}
                />
                <Route exact path="/contact" component={ContactPage} />
                <Route exact path="/team" component={TeamPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    );
}

export default PageContent;

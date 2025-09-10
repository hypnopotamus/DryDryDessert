import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams, type Params } from "react-router";
import HomePage from "./HomePage";
import ProductSearch from "./ProductSearch";
import ShoppingCart from "./ShoppingCart";
import ProductDetails from "./Product";
import { useState } from "react";
import { store } from './app.store'
import { Provider } from 'react-redux'
import { Layout } from "./Layout";

export type navigateToProductDetails = (productId: string) => void;
export type navigateToHome = () => void;
export type navigateToSearch = (query: string) => void;
export type navigateToCheckout = () => void;

type routeParams = Readonly<Params<string>>;
const navigateRoute = (navigate: ReturnType<typeof useNavigate>, setParams: (p: routeParams) => void) =>
    (path: string, params: routeParams = {}) => {
        setParams(params);
        navigate(Object.entries(params).reduce((p, [key, value]) => p.replace(`:${key}`, value ?? ""), path));
    };

const AppContent = () => {
    const currentRouteParams = useParams();
    const [nextRouteparams, setNextParams] = useState<routeParams>({});
    const navigate = navigateRoute(useNavigate(), setNextParams);
    const navigateToProductDetails: navigateToProductDetails = (id) => navigate("/Product/:id", { id });
    const navigateToHome: navigateToHome = () => navigate("");
    const navigateToSearch: navigateToSearch = (query) => navigate("/Search/:query", { query });
    const navigateToCheckout: navigateToCheckout = () => navigate("/Cart");

    return (
        <Layout search={navigateToSearch} navigateToHome={navigateToHome} navigateToCheckout={navigateToCheckout} >
            <Routes>
                <Route index element={
                    <HomePage navigateToProductDetails={navigateToProductDetails} />
                } />
                <Route path="/Search/:query" element={
                    <ProductSearch
                        query={{ ...currentRouteParams, ...nextRouteparams }.query ?? ''}
                        navigateToProductDetails={navigateToProductDetails}
                    />
                } />
                <Route path="/Cart" element={
                    <ShoppingCart />
                } />
                <Route path="/Product/:id" element={(() => {
                    const location = useLocation();
                    const { id } = { ...currentRouteParams, ...nextRouteparams };

                    if (id) {
                        return <ProductDetails productId={id} />;
                    }

                    if (location.pathname.startsWith("/Product")) {
                        navigateToHome();
                    }

                    return null;
                })()} />
            </Routes>
        </Layout>
    );
}

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    </Provider>

);
export default App;
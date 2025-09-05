import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams, type Params } from "react-router";
import HomePage from "./HomePage";
import ProductSearch from "./ProductSearch";
import ShoppingCart from "./ShoppingCart";
import { theme } from "./app.theme";
import ProductDetails from "./Product";
import { useState } from "react";

export type navigateToProductDetails = (productId: string) => void;
export type navigateToHome = () => void;

type routeParams = Readonly<Params<string>>;
const navigateRoute = (navigate: ReturnType<typeof useNavigate>, setParams: (p: routeParams) => void) =>
    (path: string, params: routeParams = {}) => {
        setParams(params);
        const l = Object.entries(params).reduce((p, [key, value]) => p.replace(`:${key}`, value ?? ""), path);
        navigate(Object.entries(params).reduce((p, [key, value]) => p.replace(`:${key}`, value ?? ""), path));
    };

const AppContent = () => {
    const currentRouteParams = useParams();
    const [nextRouteparams, setNextParams] = useState<routeParams>({});
    const navigate = navigateRoute(useNavigate(), setNextParams);
    const navigateToProductDetails: navigateToProductDetails = (id) => navigate(`/Product/:id`, { id });
    const navigateToHome: navigateToHome = () => navigate("");

    return (
        <Routes>
            <Route index element={<HomePage navigateToProductDetails={navigateToProductDetails} />} />
            <Route path="/Search" element={<ProductSearch navigateToProductDetails={navigateToProductDetails} />} />
            <Route path="/Cart" element={<ShoppingCart navigateToHome={navigateToHome} />} />
            <Route path="/Product/:id" element={(() => {
                const location = useLocation();
                const { id } = { ...currentRouteParams, ...nextRouteparams };

                if(id){
                    return <ProductDetails productId={id} />;
                }
                
                if(location.pathname.startsWith("/Product")){
                    navigateToHome();
                }

                return null;
            })()} />
        </Routes>
    );
}

export const App = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    </ThemeProvider>
);
export default App;
import type { navigateToProductDetails } from "../App";

interface props {
    query: string;
    navigateToProductDetails: navigateToProductDetails;
}

export const ProductSearch = ({ query, navigateToProductDetails }: props) => {
    return (
        <div>you search for "{query}"</div>
    );
};
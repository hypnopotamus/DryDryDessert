import { useGetProduct } from "../Entities/useGetProduct";
import { ProductContext } from "./ProductContext";
import { ProductTile } from "./ProductTile";

interface props {
    productId: string;
}

export const ProductDetails = ({ productId }: props) => {
    const product = useGetProduct(productId);

    return (
        <ProductContext value={{ product }}>
            <ProductTile />
        </ProductContext >
    );
};
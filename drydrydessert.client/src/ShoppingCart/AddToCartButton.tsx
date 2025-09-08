import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "./shoppingCart.slice";
import type { Product } from "../Entities/Product";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useGetProduct } from "../Entities/useGetProduct";

interface props {
    product: Product | Product['id'];
}

export const AddToCartButton = ({ product: p }: props) => {
    const dispatch = useDispatch();
    const product = typeof p === 'object' ? p : useGetProduct(p);

    return product ? (
        <IconButton aria-label="add to shopping cart" onClick={() => dispatch(addProduct(product))}>
            <AddShoppingCartIcon />
        </IconButton>
    ) : null;
};
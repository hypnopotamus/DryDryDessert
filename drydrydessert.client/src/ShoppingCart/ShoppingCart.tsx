import { IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import { useSelectCart, incrementProduct, decrementProduct, removeProduct, type ProductSelection } from "./shoppingCart.slice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from "../app.store.hooks";
import { asCurrency } from "../Product/asCurrency";

const ProductRow = (product: ProductSelection) => {
    const dispatch = useDispatch();

    return (
        <TableRow aria-label={product.name}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{asCurrency(product.price)}</TableCell>
            <TableCell>
                <IconButton onClick={() => dispatch(incrementProduct(product.id))} aria-label="add one">
                    <AddCircleOutlineIcon />
                </IconButton>
                {product.selectedQuantity}
                <IconButton onClick={() => dispatch(decrementProduct(product.id))} aria-label="remove one">
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </TableCell>
            <TableCell>{asCurrency(product.price * product.selectedQuantity)}</TableCell>
            <TableCell>
                <IconButton onClick={() => dispatch(removeProduct(product.id))} aria-label="remove">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export const ShoppingCart = () => {
    const cart = useSelectCart();
    const total = Object.values(cart)
        .map(p => p.price * p.selectedQuantity)
        .reduce((t, p) => p + t, 0);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(cart).map(ProductRow)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>{asCurrency(total)}</TableCell>
                    <TableCell />
                </TableRow>
            </TableFooter>
        </Table>
    );
};
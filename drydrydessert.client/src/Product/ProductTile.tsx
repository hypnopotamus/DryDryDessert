import { Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { ProductContext } from "./ProductContext";
import { useLoadProductPrice } from "../Entities/useLoadProductProperty";
import type { Product } from "../Entities/Product";
import { AddToCartButton } from "../ShoppingCart/AddToCartButton";

const ProductContent = ({ product }: { product: Product }) => {
    const price = useLoadProductPrice(product);

    return (
        <ProductCard product={product}>
            <Box m={1}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {product.description}
                </Typography>
                <Typography color="text.secondary">
                    {price?.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </Typography>
            </Box>
        </ProductCard>
    );
}

export const ProductTile = () => {
    return (
        <>
            <ProductContext.Consumer>
                {value => value.product && <>
                    <ProductContent product={value.product} />
                    <AddToCartButton product={value.product} />
                </>}
            </ProductContext.Consumer>
        </>
    );
}
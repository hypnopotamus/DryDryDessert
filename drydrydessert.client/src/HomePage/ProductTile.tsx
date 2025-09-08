import { Box, Typography } from "@mui/material";
import type { Product } from "../Entities/Product";
import { ProductCard } from "../Product/ProductCard";
import { AddToCartButton } from "../ShoppingCart/AddToCartButton";

interface props {
    product: Pick<Product, 'id' | 'name' | 'description' | 'image'>;
    openDetails: () => void;
}

export const ProductTile = ({ product, openDetails }: props) => {
    return (
        <ProductCard product={product} onClick={openDetails}>
            {{
                content: (
                    <Box m={1}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography color="text.secondary">
                            {product.description}
                        </Typography>
                    </Box>
                ),
                actions: (
                    <AddToCartButton product={product.id} />
                )
            }}
        </ProductCard>
    );
};
import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import type { Product } from "../Entities/Product";
import { useLoadProductImage } from "../Entities/useLoadProductProperty";

interface Props {
    product: Pick<Product, 'name' | 'description' | 'image'>;
    openDetails: () => void;
}

export const ProductTile = ({ product, openDetails }: Props) => {
    const image = useLoadProductImage(product);

    return (
        <Card raised>
            <CardActionArea onClick={openDetails}>
                <CardMedia
                    component="img"
                    image={image?.href}
                    alt={product.name}
                />
                <Box m={1}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography color="text.secondary">
                        {product.description}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
};
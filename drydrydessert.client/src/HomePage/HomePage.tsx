import type { navigateToProductDetails } from "../App";
import { useGetProducts } from "../Entities/useGetProducts";
import { ProductTile } from "./ProductTile";
import { Grid } from "@mui/material";

interface props {
    navigateToProductDetails: navigateToProductDetails;
}

export const HomePage = ({ navigateToProductDetails }: props) => {
    const products = useGetProducts();

    return (
        <Grid container spacing={2}>
            {products.map(p =>
            (
                <Grid size={4} key={p.id}>
                    <ProductTile product={p} openDetails={() => navigateToProductDetails(p.id)}/>
                </Grid>
            )
            )}
        </Grid>
    );
};
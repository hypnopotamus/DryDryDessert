import { productFactory } from "../test";
import { ProductTile } from "./ProductTile";
import { ProductCard } from "../Product/ProductCard";
import { AddToCartButton } from "../ShoppingCart/AddToCartButton";
import { Button, Box } from "@mui/material";
import { ProductContext } from "./ProductContext";
import type { ReactNode } from "react";

vi.mock("../Product/ProductCard");
vi.mock("../ShoppingCart/AddToCartButton");

const product = productFactory("1");

const renderProductCardContent = (p: Parameters<typeof ProductCard>[0]['product']) => `card-${JSON.stringify(p)}`;
const renderAddToCartProduct = (p: Parameters<typeof AddToCartButton>[0]['product']) => `add-${JSON.stringify(p)}`;
vi.mocked(ProductCard).mockImplementation(props => (
    <Box>
        {(props.children as any) ?? null}
        <Button onClick={props.onClick}>
            {renderProductCardContent(props.product)}
        </Button>
    </Box>
));
vi.mocked(AddToCartButton).mockImplementation(props => (
    <>
        {renderAddToCartProduct(props.product)}
    </>
));

const renderWithContext = async (element: ReactNode) => await act(async () => await render(
    <ProductContext.Provider value={{ product }}>
        {element}
    </ProductContext.Provider>
));

describe("<ProductTile />", () => {
    it("renders the product card", async () => {
        const { queryByText } = await renderWithContext(<ProductTile />);

        expect(queryByText(renderProductCardContent(product))).toBeVisible();
    });

    it("renders the product name, description, and price", async () => {
        const { queryByText } = await renderWithContext(<ProductTile />);

        expect(queryByText(product.name)).toBeVisible();
        expect(queryByText(await product.description)).toBeVisible();
    });

    it("renders the add to cart action button", async () => {
        const { queryByText } = await renderWithContext(<ProductTile />);

        expect(queryByText(product.name)).toBeVisible();
        expect(queryByText(await product.description)).toBeVisible();
    });
});
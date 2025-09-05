import { useGetProducts } from "../Entities/useGetProducts";
import { ProductTile } from "./ProductTile";
import { productFactory } from "../test";
import { HomePage } from "./HomePage";
import type { navigateToProductDetails } from "../App";

vi.mock("../Entities/useGetProducts");
vi.mock("./ProductTile");

const products = [
    productFactory("1"),
    productFactory("2"),
    productFactory("3"),
]
vi.mocked(useGetProducts).mockReturnValue(products);

describe("<HomePage />", () => {
    it("renders a product tile for each product", () => {
        const navigateToProductDetails = new Map(products.map(p => [p.id, vi.fn()]));

        render(<HomePage navigateToProductDetails={id => navigateToProductDetails.get(id)?.()} />);

        for (const product of products) {
            expect(vi.mocked(ProductTile)).toHaveBeenCalledWith({ product, openDetails: expect.anything() }, undefined);
            vi.mocked(ProductTile).mock.calls.find(call => call[0].product === product)?.[0].openDetails();
            expect(navigateToProductDetails.get(product.id)).toHaveBeenCalled();
        }
    });
});
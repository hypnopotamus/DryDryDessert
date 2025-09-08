import { ProductTile } from "./ProductTile";
import { ProductDetails } from './ProductDetails';
import { useGetProduct } from "../Entities/useGetProduct";
import { productFactory } from "../test";
import type { Product } from "../Entities/Product";
import { ProductContext } from "./ProductContext";

vi.mock("../Entities/useGetProduct");
vi.mock("./ProductTile");

const product = productFactory("1");

const renderProduct = (p: Product) => JSON.stringify(p);
vi.mocked(useGetProduct).mockImplementation(p => p === product.id ? product : productFactory("some other BS"));
vi.mocked(ProductTile).mockImplementation(() => (
    <ProductContext.Consumer>
        {value => value.product && <>
            {renderProduct(value.product)}
        </>}
    </ProductContext.Consumer>
));

describe("<ProductDetails />", () => {
    it("renders the <ProductTile /> providing the product by ID from the API", () => {
        const { queryByText } = render(<ProductDetails productId={product.id} />);

        expect(queryByText(renderProduct(product))).toBeVisible();
    })
});
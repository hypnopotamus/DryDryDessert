import { useLoadProductImage } from "../Entities/useLoadProductProperty";
import { productFactory } from "../test";
import { ProductTile } from "./ProductTile";

vi.mock("../Entities/useLoadProductProperty");

const product = productFactory("1");
const image = await product.image;
vi.mocked(useLoadProductImage).mockReturnValue(image);

describe("<ProductTile />", () => {
    it("renders the product image", async () => {
        const { getByRole } = await act(async () => await render(<ProductTile product={product} openDetails={vi.fn()} />));

        const img = getByRole('img');
        expect(img).toBeVisible();
        expect(img).toHaveProperty('src', image.href);
    });

    it("renders the product name and description", async () => {
        const { queryByText } = await act(async () => await render(<ProductTile product={product} openDetails={vi.fn()} />));

        expect(queryByText(product.name)).toBeVisible();
        expect(queryByText(await product.description)).toBeVisible();
    });

    describe("when clicked", () => {
        it("opens the product details", async () => {
            const openDetails = vi.fn();

            const { getByRole } = await act(async () => await render(<ProductTile product={product} openDetails={openDetails} />));
            await userEvent.click(getByRole('button'));

            expect(openDetails).toHaveBeenCalled();
        });
    });
});
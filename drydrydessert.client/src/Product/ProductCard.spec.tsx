import { useLoadProductImage } from "../Entities/useLoadProductProperty";
import { productFactory } from "../test";
import { ProductCard } from "./ProductCard";

vi.mock("../Entities/useLoadProductProperty");

const product = productFactory("1");
const image = await product.image;
vi.mocked(useLoadProductImage).mockReturnValue(image);

describe("<ProductCard />", () => {
    const props: Parameters<typeof ProductCard>[0] = {
        product: product,
        children: <></>
    }
    it("renders the product image", async () => {
        const { getByRole } = await act(async () => await render(<ProductCard {...props} />));

        const img = getByRole('img');
        expect(img).toBeVisible();
        expect(img).toHaveProperty('src', image.href);
    });

    describe("when clicked", () => {
        it("executes the onClick handler", async () => {
            const onClick = vi.fn();

            const { getByRole } = await act(async () => await render(<ProductCard {...props} onClick={onClick} />));
            await userEvent.click(getByRole('button'));

            expect(onClick).toHaveBeenCalled();
        });
    });

    describe("children", () => {
        const childContent = 'child-content';

        describe("when the children are a react node", () => {
            const ChildElement = () => <>{childContent}</>;

            it("renders the child content", async () => {
                const { queryByText } = await act(async () => await render(<ProductCard {...props}><ChildElement /></ProductCard>));

                expect(queryByText(childContent)).toBeVisible();
            });
        });

        describe("when the children use slots", () => {
            const actionContent = 'action-content';

            const structuredChildren: Parameters<typeof ProductCard>[0]['children'] = {
                content: <>{childContent}</>,
                actions: <>{actionContent}</>,
            }

            it("renders the child content", async () => {
                const { queryByText } = await act(async () => await render(<ProductCard {...props}>{structuredChildren}</ProductCard>));

                expect(queryByText(childContent)).toBeVisible();
            });

            it("renders the actions", async () => {
                const { queryByText } = await act(async () => await render(<ProductCard {...props}>{structuredChildren}</ProductCard>));

                expect(queryByText(actionContent)).toBeVisible();
            });
        });
    });
});
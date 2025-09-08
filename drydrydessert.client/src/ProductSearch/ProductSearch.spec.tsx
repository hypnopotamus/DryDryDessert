import { ProductSearch } from "./ProductSearch";

describe("<ProductSearch />", () => {
    it("doesn't do anything", () => {
        const { queryByText } = render(<ProductSearch navigateToProductDetails={vi.fn()} />);

        expect(queryByText('Search')).toBeVisible();
    });
});
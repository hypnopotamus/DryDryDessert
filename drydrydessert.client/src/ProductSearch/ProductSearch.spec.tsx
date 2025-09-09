import { ProductSearch } from "./ProductSearch";

describe("<ProductSearch />", () => {
    it("doesn't do anything", () => {
        const query = "some bs";

        const { queryByText } = render(<ProductSearch query={query} navigateToProductDetails={vi.fn()} />);

        expect(queryByText(query, { exact: false })).toBeVisible();
    });
});
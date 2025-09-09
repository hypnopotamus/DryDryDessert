import { SearchBar } from "./SearchBar";

const searchText = "abc 123 search with me";

describe("<SearchBar />", () => {
    const navigateToSearch = vi.fn();

    afterEach(() => {
        navigateToSearch.mockReset();
    });

    it("navigates to search with the query entered on enter press", async () => {
        const { getByRole } = render(<SearchBar search={navigateToSearch} />);

        const search = getByRole("search");
        await userEvent.click(search);
        await userEvent.type(search, searchText);
        await userEvent.keyboard("[Enter]");

        expect(navigateToSearch).toHaveBeenCalledWith(searchText);
    });

    describe("search icon button", () => {
        it("navigates to search with the query entered on click", async () => {
            const { getByRole } = render(<SearchBar search={navigateToSearch} />);

            await userEvent.type(getByRole("search"), searchText);
            await userEvent.click(getByRole("button"));

            expect(navigateToSearch).toHaveBeenCalledWith(searchText);
        });
    });
});
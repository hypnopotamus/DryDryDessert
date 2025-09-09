import { SearchBar, type Props as SearchBarProps } from "./ProductSearch/SearchBar";
import { Menu, type Props as MenuProps } from "./Menu";
import { Layout } from "./Layout";

vi.mock("./ProductSearch/SearchBar");
vi.mock("./Menu");

describe("<Layout />", () => {
    it("renders the search bar, then the content, then the bottom menu", () => {
        const navigateToHome = vi.fn();
        const navigateToCheckout = vi.fn();
        const search = vi.fn();
        const role = 'test'
        const searchBarContent = "SearchBar"
        vi.mocked(SearchBar).mockImplementation(() => <div role={role}>{searchBarContent}</div>);
        const pageContent = "Content";
        const Content = () => <div role={role}>{pageContent}</div>
        const menuContent = "Menu";
        vi.mocked(Menu).mockImplementation(() => <div role={role}>{menuContent}</div>);

        const { getByText, getAllByRole } = render(
            <Layout navigateToHome={navigateToHome} navigateToCheckout={navigateToCheckout} search={search}>
                <Content />
            </Layout>
        );

        const elements = getAllByRole(role);
        const searchElement = getByText(searchBarContent);
        const contentElement = getByText(pageContent);
        const menuElement = getByText(menuContent);
        expect(SearchBar).toHaveBeenCalledWith(expect.objectContaining<SearchBarProps>({ search }), undefined);
        expect(Menu).toHaveBeenCalledWith(expect.objectContaining<MenuProps>({ navigateToHome, navigateToCheckout }), undefined);
        expect(elements.indexOf(searchElement)).toBeLessThan(elements.indexOf(contentElement));
        expect(elements.indexOf(menuElement)).toBeGreaterThan(elements.indexOf(contentElement));
    });
});
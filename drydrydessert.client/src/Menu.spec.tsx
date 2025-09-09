import { Menu } from "./Menu";

describe("<Menu />", () => {
    describe("Home", () => {
        it("navigates to home on click", async () => {
            const navigateToHome = vi.fn();
            const { getByText } = render(<Menu navigateToHome={navigateToHome} navigateToCheckout={vi.fn()} />);

            await userEvent.click(getByText("home"));

            expect(navigateToHome).toHaveBeenCalled();
        });
    });

    describe("Cart", () => {
        it("navigates to the shopping cart on click", async () => {
            const navigateToCheckout = vi.fn();
            const { getByText } = render(<Menu navigateToHome={vi.fn()} navigateToCheckout={navigateToCheckout} />);

            await userEvent.click(getByText("cart"));

            expect(navigateToCheckout).toHaveBeenCalled();
        });
    });
});
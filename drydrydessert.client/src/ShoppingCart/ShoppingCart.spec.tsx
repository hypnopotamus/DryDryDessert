import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "./shoppingCart.slice";
import { useSelectCart, incrementProduct, decrementProduct, removeProduct, type ProductSelection } from "./shoppingCart.slice";
import { stringToNumber } from "../test/stringToNumber";
import { Provider } from "react-redux";
import { ShoppingCart } from "./ShoppingCart";
import { asCurrency } from "../Product/asCurrency";

vi.mock("./shoppingCart.slice");

const productFactory = (id: string): { [key: string]: ProductSelection } => ({
    [id]: {
        id: id,
        name: `${id}-name`,
        category: `${id}-category`,
        description: `${id}-description`,
        stockQuantity: stringToNumber(id),
        price: (() => {
            const p = stringToNumber(id);

            return p + p / 100;
        })(),
        reviews: [],
        image: new URL(`http://${id.replace(" ", "")}-image.com`),
        selectedQuantity: stringToNumber(id)
    }
});
const initialCart: Cart = {
    ...productFactory("product one"),
    ...productFactory("product two"),
    ...productFactory("product three")
};
const products: ProductSelection[] = Object.values(initialCart);
const fakeCart = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        incrementProduct: (cart, { payload: productId }: PayloadAction<string>) => {
            cart[productId].selectedQuantity += 1;
        },
        decrementProduct: (cart, { payload: productId }: PayloadAction<string>) => {
            cart[productId].selectedQuantity -= 1;
        },
        removeProduct: (cart, { payload: productId }: PayloadAction<string>) => {
            delete cart[productId];
        },
        reset: () => initialCart
    },
});
const store = configureStore({
    reducer: {
        cart: fakeCart.reducer,
    }
});

vi.mocked(useSelectCart).mockImplementation(() => store.getState().cart);
vi.mocked(incrementProduct).mockImplementation(fakeCart.actions.incrementProduct);
vi.mocked(decrementProduct).mockImplementation(fakeCart.actions.decrementProduct);
vi.mocked(removeProduct).mockImplementation(fakeCart.actions.removeProduct);

const renderCart = () => render(
    <Provider store={store}>
        <ShoppingCart />
    </Provider>
);

describe("<ShoppingCart />", () => {
    afterEach(() => {
        store.dispatch(fakeCart.actions.reset());
    })

    it("displays the overall total of items in the cart", () => {
        const overallTotal = products.reduce((t, p) => (p.selectedQuantity * p.price) + t, 0);

        const { queryByText } = renderCart();

        expect(queryByText(asCurrency(overallTotal))).toBeVisible();
    });

    describe.each(products)("$id product row", (product) => {
        const renderedProductRow = () => within(renderCart().getByLabelText(product.name));
        const renderedRowButton = (label: string) => renderedProductRow().getByLabelText(label);

        it("contains the product name, price, selected quantity and total", () => {
            const { queryByText } = renderedProductRow();

            expect(queryByText(product.name)).toBeVisible();
            expect(queryByText(asCurrency(product.price))).toBeVisible();
            expect(queryByText(product.selectedQuantity)).toBeVisible();
            expect(queryByText(asCurrency(product.price * product.selectedQuantity))).toBeVisible();
        });

        describe("the increment quantity button", () => {
            it("updates the cart to have one more of that product", async () => {
                const incrementButton = renderedRowButton("add one");

                await userEvent.click(incrementButton);

                expect(store.getState().cart[product.id].selectedQuantity).toBe(initialCart[product.id].selectedQuantity + 1);
            });
        });

        describe("the decrement quantity button", () => {
            it("updates the cart to have one less of that product", async () => {
                const decrementButton = renderedRowButton("remove one");

                await userEvent.click(decrementButton);

                expect(store.getState().cart[product.id].selectedQuantity).toBe(initialCart[product.id].selectedQuantity - 1);
            });
        });

        describe("the remove button", () => {
            it("updates the cart to have one less of that product", async () => {
                const removeButton = renderedRowButton("remove");

                await userEvent.click(removeButton);

                expect(store.getState().cart[product.id]).toBeUndefined();
            });
        });
    });
});
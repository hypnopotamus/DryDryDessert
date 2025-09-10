import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../app.store';
import type { Product } from '../Entities/Product';
import { useSelector } from '../app.store.hooks';
import { castImmutable, type Immutable, type WritableDraft } from "immer";

type ResolvedPromises<T> = Immutable<{
    readonly [K in keyof T]: T[K] extends Promise<any> ? Awaited<T[K]> : T[K]
}>;
const resolvePromiseProperties = async <T extends Object>(payload: T) => [
    ...await Promise.all(
        Object.entries(payload)
            .map(async ([p, v]) => ({ [p]: await v }))
    )
].reduce((o, p) => ({ ...o, ...p }), {}) as ResolvedPromises<T>

export type ProductSelection = Readonly<ResolvedPromises<Product> & { readonly selectedQuantity: number }>;
export interface Cart {
    readonly [key: string]: ProductSelection
};

const isNumber = (value: any): value is number => typeof value === 'number';
const isString = (value: any): value is string => typeof value === 'string';

const createThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
}>()


type cartUpdate = {
    product: ProductSelection | string,
    amount: (number | ((p: ProductSelection) => number))
}
const updateCart = (cart: WritableDraft<Cart>, { product, amount }: cartUpdate) => {
    const cartProduct = isString(product) ? cart[product] : cart[product.id] ?? product;
    if (!cartProduct) return cart;

    const newAmount = isNumber(amount)
        ? amount
        : amount(castImmutable(cartProduct));
    if (newAmount <= 0) {
        const {
            [cartProduct.id]: _,
            ...updated
        } = cart;

        return updated;
    }

    return {
        ...cart,
        [cartProduct.id]: {
            ...cartProduct,
            selectedQuantity: newAmount
        }
    };
};

const initialState: Cart = {};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (cart, { payload }: PayloadAction<cartUpdate>) => updateCart(cart, payload),
        incrementProduct: (cart, { payload: productId }: PayloadAction<string>) => updateCart(
            cart,
            {
                product: productId,
                amount: p => p.selectedQuantity + 1
            }
        ),
        decrementProduct: (cart, { payload: productId }: PayloadAction<string>) => updateCart(
            cart,
            {
                product: productId,
                amount: p => p.selectedQuantity - 1
            }
        ),
        setProductSelectedAmount: (cart, { payload: { productId, amount } }: PayloadAction<{ productId: string, amount: number }>) => updateCart(
            cart,
            {
                product: productId,
                amount
            }
        ),
        removeProduct: (cart, { payload: productId }: PayloadAction<string>) => {
            delete cart[productId];
        },
        clearCart: () => ({})
    },
});

export const addProduct = createThunk(
    "addProduct",
    async (product: Product, { dispatch }) => dispatch(
        cartSlice.actions.updateCart({
            product: { ...(await resolvePromiseProperties(product)), selectedQuantity: 0 },
            amount: p => p.selectedQuantity + 1
        })
    )
);

export const {
    incrementProduct,
    decrementProduct,
    setProductSelectedAmount,
    removeProduct,
    clearCart
} = cartSlice.actions

export const useSelectCart = () => useSelector(state => state.cart);

export default cartSlice.reducer
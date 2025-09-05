import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app.store';
import type { Product } from '../Entities/Product';
import { useAppSelector } from '../app.store.hooks';

type ProductSelection = Product & { selectedQuantity: number };
interface Cart {
    selectedProducts: Map<string, ProductSelection>;
};

const initialState: Cart = {
    selectedProducts: new Map(),
};

const isNumber = (value: any): value is number => typeof value === 'number';
const isString = (value: any): value is string => typeof value === 'string';

const updateCart = (cart: Cart, product: Product | string, amount: (number | ((p: ProductSelection) => number))) => {
    if (isString(product)) {
        const p = cart.selectedProducts.get(product);
        if (!p) return;
        product = p;
    }

    const newAmount = isNumber(amount)
        ? amount
        : amount(cart.selectedProducts.get(product.id)!);
    if (newAmount <= 0) {
        cart.selectedProducts.delete(product.id);
        return;
    }

    cart.selectedProducts.set(
        product.id,
        {
            ...product,
            selectedQuantity: newAmount
        }
    );
};

const cartSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addProduct: (cart, { payload: product }: PayloadAction<Product>) =>
            updateCart(
                cart,
                product,
                (cart.selectedProducts.get(product.id)?.selectedQuantity ?? 0) + 1
            ),
        incrementProduct: (cart, { payload: productId }: PayloadAction<string>) =>
            updateCart(
                cart,
                productId,
                p => p.selectedQuantity + 1
            ),
        decrementProduct: (cart, { payload: productId }: PayloadAction<string>) =>
            updateCart(
                cart,
                productId,
                p => p.selectedQuantity - 1
            ),
        setProductSelectedAmount: (cart, { payload: { productId: productId, amount: amount } }: PayloadAction<{ productId: string, amount: number }>) =>
            updateCart(
                cart,
                productId,
                amount
            ),
        removeProduct: (cart, { payload: productId }: PayloadAction<string>) => {
            cart.selectedProducts.delete(productId);
        },
        clearCart: (cart) => {
            cart.selectedProducts.clear();
        }
    },
})

export const {
    addProduct,
    incrementProduct,
    decrementProduct,
    setProductSelectedAmount,
    removeProduct,
    clearCart,
} = cartSlice.actions

export const useSelectCart = () => useAppSelector((state: RootState) => state.cart);

export default cartSlice.reducer
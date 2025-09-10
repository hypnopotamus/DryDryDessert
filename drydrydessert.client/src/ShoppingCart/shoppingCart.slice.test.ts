import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { addProduct, incrementProduct, decrementProduct, setProductSelectedAmount, removeProduct, clearCart } from './shoppingCart.slice';
import { productFactory } from "../test";

const { dispatch, getState } = configureStore({
    reducer: {
        cart: cartSlice
    }
});

const productInCart = productFactory("in");
const productNotInCart = productFactory("not in");

const isPromise = (p: Promise<any> | any): p is Promise<any> => typeof p === 'object' && 'finally' in p;
const nonPromiseProperties = <T extends {}>(obj: T): { property: keyof T, value: any }[] => Object.entries(obj)
    .filter(([_, v]) => !isPromise(v))
    .map(([p, v]) => ({ property: p as keyof T, value: v }));
const promiseProperties = <T extends {}>(obj: T): { property: keyof T, promise: Promise<any> }[] => Object.entries(obj)
    .filter(([_, v]) => isPromise(v))
    .map(([p, v]) => ({ property: p as keyof T, promise: v as Promise<any> }));

describe("shopping cart state slice", () => {
    beforeEach(async () => {
        dispatch(clearCart());
        await dispatch(addProduct(productInCart));
        dispatch(setProductSelectedAmount({ productId: productInCart.id, amount: 10 }));
    });

    describe("addProduct", () => {
        describe("for a product not in the cart", () => {
            it("flattens all the product promises and adds that product to the cart with selected quantity 1", async () => {
                await dispatch(addProduct(productNotInCart));

                const cartProduct = getState().cart[productNotInCart.id];
                expect(cartProduct).toBeDefined();
                expect(cartProduct.selectedQuantity).toBe(1);
                for (const { property, value } of nonPromiseProperties(productNotInCart)) {
                    expect(cartProduct[property]).toBe(value);
                }
                for (const { property, promise } of promiseProperties(productNotInCart)) {
                    expect(cartProduct[property]).toBe(await promise);
                }
            });
        });

        describe("for a product in the cart", () => {
            it("increases the selected quantity by 1", async () => {
                const startingQuantity = getState().cart[productInCart.id].selectedQuantity;

                await dispatch(addProduct(productInCart));

                expect(getState().cart[productInCart.id].selectedQuantity).toBe(startingQuantity + 1);
            });
        });
    });

    describe("incrementProduct", () => {
        describe("for a product not in the cart", () => {
            it("does nothing to the state", () => {
                const startingState = getState();

                dispatch(incrementProduct(productNotInCart.id));

                expect(getState()).toStrictEqual(startingState);
            });
        });

        describe("for a product in the cart", () => {
            it("increases the selected quantity by 1", () => {
                const startingAmount = getState().cart[productInCart.id].selectedQuantity;

                dispatch(incrementProduct(productInCart.id));

                expect(getState().cart[productInCart.id].selectedQuantity).toBe(startingAmount + 1);
            });
        });
    });

    describe("decrementProduct", () => {
        describe("for a product not in the cart", () => {
            it("does nothing to the state", () => {
                const startingState = getState();

                dispatch(decrementProduct(productNotInCart.id));

                expect(getState()).toStrictEqual(startingState);
            });
        });

        describe("for a product in the cart", () => {
            it("reduces the selected quantity by 1", () => {
                const startingAmount = getState().cart[productInCart.id].selectedQuantity;

                dispatch(decrementProduct(productInCart.id));

                expect(getState().cart[productInCart.id].selectedQuantity).toBe(startingAmount - 1);
            });

            describe("when the selected quantity is reduced to zero", () => {
                it("removes the product from the cart", () => {
                    while (getState().cart[productInCart.id]?.selectedQuantity ?? 0 > 0) {
                        dispatch(decrementProduct(productInCart.id));
                    }

                    expect(getState().cart[productInCart.id]).toBeUndefined();
                });
            });
        });
    });

    describe("setProductSelectedAmount", () => {
        describe("for a product not in the cart", () => {
            it("does nothing to the state", () => {
                const startingState = getState();

                dispatch(setProductSelectedAmount({ productId: productNotInCart.id, amount: 5 }));

                expect(getState()).toStrictEqual(startingState);
            });
        });

        describe("for a product in the cart", () => {
            it("sets the selected quantity", () => {
                const amount = 5;

                dispatch(setProductSelectedAmount({ productId: productInCart.id, amount }));

                expect(getState().cart[productInCart.id].selectedQuantity).toBe(amount);
            });

            describe("when the amount is zero", () => {
                it("removes the product from the cart", () => {
                    dispatch(setProductSelectedAmount({ productId: productInCart.id, amount: 0 }));

                    expect(getState().cart[productInCart.id]).toBeUndefined();
                });
            });

            describe("when the amount is less than zero", () => {
                it("removes the product from the cart", () => {
                    dispatch(setProductSelectedAmount({ productId: productInCart.id, amount: -1 }));

                    expect(getState().cart[productInCart.id]).toBeUndefined();
                });
            });
        });
    });

    describe("removeProduct", () => {
        describe("for a product not in the cart", () => {
            it("does nothing to the state", () => {
                const startingState = getState();

                dispatch(removeProduct(productNotInCart.id));

                expect(getState()).toStrictEqual(startingState);
            });
        });

        describe("for a product in the cart", () => {
            it("removes the product entirely", () => {
                dispatch(removeProduct(productInCart.id));

                expect(getState().cart[productInCart.id]).toBeUndefined();
            });
        });
    });

    describe("clearCart", () => {
        it("removes everything from the cart", () => {
            dispatch(clearCart());

            expect(getState().cart).toStrictEqual({});
        });
    });
});
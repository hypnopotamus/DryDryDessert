import { useLoadProductDescription, useLoadProductStock, useLoadProductPrice, useLoadProductImage } from "./useLoadProductProperty";
import { productFactory } from "../test";

const product = productFactory("1");

describe("loading async product properties", () => {
    describe("useLoadProductDescription", () => {
        it("returns the promised result of product.description", async () => {
            const { result } = renderHook(() => useLoadProductDescription(product));

            await waitFor(async () => expect(result.current).toBe(await product.description));
        });
    });

    describe("useLoadProductStock", () => {
        it("returns the promised result of product.stockQuantity", async () => {
            const { result } = renderHook(() => useLoadProductStock(product));

            await waitFor(async () => expect(result.current).toBe(await product.stockQuantity));
        })
    });

    describe("useLoadProductPrice", () => {
        it("returns the promised result of product.price", async () => {
            const { result } = renderHook(() => useLoadProductPrice(product));

            await waitFor(async () => expect(result.current).toBe(await product.price));
        })
    });

    describe("useLoadProductImage", () => {
        it("returns the promised result of product.image", async () => {
            const { result } = renderHook(() => useLoadProductImage(product));

            await waitFor(async () => expect(result.current).toBe(await product.image));
        })
    });
});
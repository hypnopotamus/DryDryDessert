import { refreshProduct } from "./refreshProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { productFactory } from "../test";

vi.mock("./refreshProduct");

const product = productFactory("original");
const updatedProduct = productFactory("updated");

vi.mocked(refreshProduct).mockImplementation(p => Promise.resolve(p === product ? updatedProduct : productFactory("some other BS")));

describe("useUpdateProduct", () => {
    describe("when a product mutation promise is submitted", () => {
        it("finishes the mutation then refreshes the product", async () => {
            const { result } = renderHook(() => useUpdateProduct(product));
            const startingProductState = result.current[0];
            const mutation = new Promise<void>((resolve, reject) => vi.mocked(refreshProduct).mock.lastCall ? reject() : resolve());

            await act(() => result.current[1](mutation));

            expect(startingProductState).toBe(product);
            await mutation;
            expect(result.current[0]).toBe(updatedProduct);
        })
    });
});
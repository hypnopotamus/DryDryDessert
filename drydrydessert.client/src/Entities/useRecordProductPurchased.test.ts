import { pimClient } from "../clients";
import { useUpdateProduct } from "./useUpdateProduct";
import { useRecordProductPurchased } from "./useRecordProductPurchased";
import { productFactory } from "../test";

vi.mock("./useUpdateProduct");
vi.mock("../clients");

const purchased = 2;
const product = productFactory("original");
const updatedProduct = productFactory("updated");

const update = vi.fn();
const updateQuantity = Promise.resolve();
vi.mocked(useUpdateProduct).mockImplementation(p => p === product ? [updatedProduct, update] : [p, () => { }]);
vi.mocked(pimClient.apiProductsIdQuantityInStockPost).mockImplementation(async i => i.id === product.id && i.quantityInStock === await product.stockQuantity - purchased ? updateQuantity : Promise.reject());

describe("useRecordProductPurchased", () => {
    it("updates the stock and refreshes the product", async () => {
        const { result } = renderHook(() => useRecordProductPurchased(product));

        await act(() => result.current[1](purchased));

        expect(update).toHaveBeenCalledWith(updateQuantity);
    });
});
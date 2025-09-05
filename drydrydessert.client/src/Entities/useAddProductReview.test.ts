import { serverClient } from "../clients";
import { useUpdateProduct } from "./useUpdateProduct";
import { useAddProductReview } from "./useAddProductReview";
import { productFactory } from "../test";

vi.mock("./useUpdateProduct");
vi.mock("../clients");

const review = "review";
const product = productFactory("original");
const updatedProduct = productFactory("updated");
const update = vi.fn();
const addReview = Promise.resolve();
vi.mocked(useUpdateProduct).mockImplementation(p => p === product ? [updatedProduct, update] : [p, () => { }]);
vi.mocked(serverClient.apiProductsIdReviewsPost).mockImplementation(i => i.id === product.id && i.body === review ? addReview : Promise.reject());

describe("useAddProductReview", () => {
    it("adds the review and refreshes the product", async () => {
        const { result } = renderHook(() => useAddProductReview(product));

        await act(() => result.current[1](review));

        expect(update).toHaveBeenCalledWith(addReview);
    });
});
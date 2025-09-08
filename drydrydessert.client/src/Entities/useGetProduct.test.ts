import { serverClient } from "../clients";
import type { Product as ProductContract } from "../clients/server";
import type { Product } from "./Product";
import { productFromContract } from "./productFromContract";
import { useGetProduct } from "./useGetProduct";
import { productFactory, productContractFactory } from "../test";

vi.mock("../clients");
vi.mock("./productFromContract");

const productContract = productContractFactory("1");
const product: Product = productFactory(productContract.id);

vi.mocked(productFromContract).mockImplementation(p => p === productContract ? product : productFactory("some other BS"));

describe("useGetProduct", () => {
    let release = (): Promise<void> => Promise.resolve();

    beforeEach(() => {
        let r: (_: ProductContract) => void;
        const semaphore = new Promise<ProductContract>(resolve => { r = resolve });
        release = async () => {
            r(productContract);
            await semaphore;
        };

        vi.mocked(serverClient).apiProductsIdGet.mockReturnValue(semaphore);
    });

    afterEach(async () => {
        await act(() => release());
    });

    describe("before the api returns the product", () => {
        it("returns undefined", () => {
            const { result } = renderHook(useGetProduct);

            expect(result.current).toBeUndefined();
        });
    });

    describe("after the api return the product data", () => {
        it("returns that product converted to the UI internal representation", async () => {
            const { result } = renderHook(useGetProduct);

            await act(() => release());

            expect(result.current).toBe(product);
        });
    });
});
import { serverClient } from "../clients";
import type { Product as ProductContract } from "../clients/server";
import type { Product } from "./Product";
import { productsFromContract } from "./productsFromContract";
import { useGetProducts } from "./useGetProducts";
import { productFactory, productContractFactory } from "../test";

vi.mock("../clients");
vi.mock("./productsFromContract");

const productContracts = [
    productContractFactory("1"),
    productContractFactory("2"),
];
const products: Product[] = productContracts.map(p => productFactory(p.id));

vi.mocked(productsFromContract).mockImplementation(p => p === productContracts ? products : [])

describe("useGetProducts", () => {
    let release = (): Promise<void> => Promise.resolve();

    beforeEach(() => {
        let r: (_: ProductContract[]) => void;
        const semaphore = new Promise<ProductContract[]>(resolve => { r = resolve });
        release = async () => {
            r(productContracts);
            await semaphore;
        };

        vi.mocked(serverClient).apiProductsGet.mockReturnValue(semaphore);
    });

    afterEach(async () => {
        await act(() => release());
    });

    describe("before the api returns products", () => {
        it("returns an empty array", () => {
            const { result } = renderHook(useGetProducts);

            expect(result.current).toEqual([]);
        });
    });

    describe("after the api returns products", () => {
        it("returns an array of those products", async () => {
            const { result } = renderHook(useGetProducts);

            await act(() => release());

            expect(result.current).toBe(products);
        });
    });
});
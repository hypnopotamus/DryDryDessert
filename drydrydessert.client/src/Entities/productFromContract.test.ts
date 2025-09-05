import type { Product as PimProduct } from "../clients/pim";
import { productReviewFromContract } from "./productReviewFromContract";
import { pimClient } from "../clients";
import { productFromContract } from "./productFromContract";
import { pimProductContractFactory, productContractFactory, productReviewContractFactory } from "../test";

vi.mock("../clients");

const productContract = productContractFactory("product-id", productReviewContractFactory("review-comment"), productReviewContractFactory("another-review-comment"));
const pimProduct = pimProductContractFactory(productContract.id);

describe("productFromContract", () => {
    let release = (): Promise<void> => Promise.resolve();

    beforeEach(() => {
        let r: (_: PimProduct) => void;
        const semaphore = new Promise<PimProduct>(resolve => { r = resolve });
        release = async () => {
            r(pimProduct);
            await semaphore;
        };

        vi.mocked(pimClient).apiProductsIdGet.mockReturnValue(semaphore);
    });

    afterEach(() => {
        release();
    });

    describe("before the pim product data is loaded", () => {
        it("has all the api data", () => {
            const product = productFromContract(productContract);

            expect(product.id).toBe(productContract.id);
            expect(product.name).toBe(productContract.name);
            expect(product.category).toBe(productContract.type);
            expect(product.reviews).toHaveLength(2);
            expect(product.reviews[0]).toEqual(productReviewFromContract(productContract.reviews[0]));
            expect(product.reviews[1]).toEqual(productReviewFromContract(productContract.reviews[1]));
        });

        it("has unresolved promises for all the pim data", async () => {
            const expectedTimeoutRejection = "expectedTimeoutRejection";

            const product = productFromContract(productContract);

            let rejectedReason: any | undefined;
            await Promise.race([
                Promise.any([product.description, product.stockQuantity, product.price, product.image]),
                new Promise((_, reject) => setTimeout(() => reject(expectedTimeoutRejection), 5))
            ]).catch((reason) => { rejectedReason = reason; });
            expect(rejectedReason).toBe(expectedTimeoutRejection);
        });
    });

    describe("after the pim product data is loaded", () => {
        it("has resolved promises for all the pim data", async () => {
            const product = productFromContract(productContract);
            await release();

            await expect(product.description).resolves.toEqual(pimProduct.description);
            await expect(product.stockQuantity).resolves.toEqual(pimProduct.quantityInStock);
            await expect(product.price).resolves.toEqual(pimProduct.pricePerUnit);
            await expect(product.image).resolves.toSatisfy((i: URL) => new RegExp(`/pim/${pimProduct.image}`).test(i.href));
        });
    });
});
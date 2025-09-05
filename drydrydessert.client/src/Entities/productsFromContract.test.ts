import type { Product } from "./Product";
import { productFromContract } from "./productFromContract";
import { productsFromContract } from "./productsFromContract";
import { productContractFactory, productReviewContractFactory } from "../test";

vi.mock("./productFromContract");

const productContracts = [
    productContractFactory("1", productReviewContractFactory("1")),
    productContractFactory("2", productReviewContractFactory("2"), productReviewContractFactory("2")),
];

vi.mocked(productFromContract).mockImplementation(p => ({}) as Product);

describe("productsFromContract", () => {
    it("needs to be tested", () => {
        const products = productsFromContract(productContracts);

        expect(products).toHaveLength(productContracts.length);
        for(const [i, contract] of productContracts.entries()) {
            expect(vi.mocked(productFromContract)).toHaveBeenCalledWith(contract);
            expect(products[i]).toBe(vi.mocked(productFromContract).mock.results[i].value);
        }
    })
});
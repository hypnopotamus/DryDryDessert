import { serverClient } from "../clients";
import { productFromContract } from "./productFromContract";
import { refreshProduct } from "./refreshProduct";
import { productContractFactory, productFactory } from "../test";

vi.mock("../clients");
vi.mock("./productFromContract");

const product = productFactory("original");
const refreshedContract = productContractFactory("refreshed");
const refreshedProduct = productFactory(refreshedContract.id);

vi.mocked(serverClient.apiProductsIdGet).mockImplementation(i => i.id === product.id ? Promise.resolve(refreshedContract) : Promise.reject());
vi.mocked(productFromContract).mockImplementation(c => c === refreshedContract ? refreshedProduct : productFactory("some other BS"));

describe("refreshProduct", () => {
    it("updates the product by ID from the API", async () => {
        const updated = await refreshProduct(product);

        expect(updated).toBe(refreshedProduct);
    })
});
import type { Product as ProductContract } from "../clients/server";
import type { Product } from "./Product";
import { productFromContract } from "./productFromContract";

export const productsFromContract = (products: ProductContract[]): Product[] =>
    products.map(p => productFromContract(p));
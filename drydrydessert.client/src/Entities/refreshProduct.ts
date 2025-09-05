import type { Product } from "./Product";
import { serverClient } from "../clients";
import { productFromContract } from "./productFromContract";

export const refreshProduct = async (product: Product): Promise<Product> => 
    productFromContract(await serverClient.apiProductsIdGet({ id: product.id }));
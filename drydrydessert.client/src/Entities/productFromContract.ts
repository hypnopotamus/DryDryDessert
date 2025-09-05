import type { Product as ProductContract } from "../clients/server";
import type { Product } from "./Product";
import { productReviewFromContract } from "./productReviewFromContract";
import { pimClient } from "../clients";

export const productFromContract = (product: ProductContract): Product => {
    const pimProduct = pimClient.apiProductsIdGet({ id: product.id });

    return {
        id: product.id,
        name: product.name,
        category: product.type,
        description: pimProduct.then(p => p.description),
        stockQuantity: pimProduct.then(p => p.quantityInStock),
        price: pimProduct.then(p => p.pricePerUnit),
        reviews: product.reviews.map(productReviewFromContract),
        image: pimProduct.then(p => {
            const host = new URL(import.meta.url);
            return new URL(`${host.protocol}//${host.host}/pim/${p.image}`);
        })
    }
}
import type { Product, ProductReview } from "../clients/server";

export const productContractFactory = (id: string, ...reviews: ProductReview[]): Product => ({
    id: id,
    name: `${id}-name`,
    type: `${id}-type`,
    reviews
});
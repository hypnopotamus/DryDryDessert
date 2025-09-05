import type { Product } from "./Product";
import { serverClient } from "../clients";
import { useUpdateProduct } from "./useUpdateProduct";

export const useAddProductReview = (product: Product): [Product, (review: string) => void] => {
    const [updated, update] = useUpdateProduct(product);

    return [updated, review => update(serverClient.apiProductsIdReviewsPost({ id: product.id, body: review }))];
};
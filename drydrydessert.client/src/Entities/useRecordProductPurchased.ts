import type { Product } from "./Product";
import { pimClient } from "../clients";
import { useUpdateProduct } from "./useUpdateProduct";

export const useRecordProductPurchased = (product: Product): [Product, (purchased: number) => void] => {
    const [updated, update] = useUpdateProduct(product);

    return [updated, purchased => update((async () => pimClient.apiProductsIdQuantityInStockPost({ id: product.id, quantityInStock: await product.stockQuantity - purchased }))())];
};
import { useEffect, useState } from "react";
import type { Product } from "./Product";
import { refreshProduct } from "./refreshProduct";

export const useUpdateProduct = (product: Product): [Product, (mutation: Promise<void>) => void] => {
    const [mutation, setMutation] = useState<Promise<void>>();
    const [updated, update] = useState<Product>(product);
    
    useEffect(() => {
        const mutate = async () => {
            await mutation;
            update(await refreshProduct(product));
        };

        mutate();
    }, [mutation]);

    return [updated, setMutation];
}
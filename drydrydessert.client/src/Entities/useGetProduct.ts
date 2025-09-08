import { useEffect, useState } from "react";
import { serverClient } from "../clients";
import type { Product } from "./Product";
import { productFromContract } from "./productFromContract";

export const useGetProduct = (id: string): Product | undefined => {
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchProducts = async () => {
            const product = await serverClient.apiProductsIdGet({ id });
            setProduct(productFromContract(product));
        };

        fetchProducts();
    }, []);

    return product;
}
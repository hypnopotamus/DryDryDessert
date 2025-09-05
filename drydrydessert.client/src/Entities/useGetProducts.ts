import { useEffect, useState } from "react";
import { serverClient } from "../clients";
import type { Product } from "./Product";
import { productsFromContract } from "./productsFromContract";

export const useGetProducts = (): Product[] => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await serverClient.apiProductsGet();
            setProducts(productsFromContract(products));
        };

        fetchProducts();
    }, []);

    return products;
}
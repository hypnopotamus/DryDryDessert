import { useEffect, useState } from "react";
import type { Product } from "./Product";

const useLoadProductProperty = <P extends keyof Product, T = Awaited<Product[P]>>(p: Promise<T>): T | undefined => {
    const [value, setValue] = useState<T | undefined>();

    useEffect(() => {
        (async () => setValue(await p))();
    }, [p]);

    return value;
};

export const useLoadProductDescription = ({ description }: Pick<Product, 'description'>) => useLoadProductProperty(description);
export const useLoadProductStock = ({ stockQuantity }: Pick<Product, 'stockQuantity'>) => useLoadProductProperty(stockQuantity);
export const useLoadProductPrice = ({ price }: Pick<Product, 'price'>) => useLoadProductProperty(price);
export const useLoadProductImage = ({ image }: Pick<Product, 'image'>) => useLoadProductProperty(image);
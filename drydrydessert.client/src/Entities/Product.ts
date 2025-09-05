import type { ProductReview } from "./ProductReview";

export interface Product {
    id: string;
    name: string;
    category: string;
    description: Promise<string>;
    stockQuantity: Promise<number>;
    price: Promise<number>;
    reviews: ProductReview[];
    image: Promise<URL>;
}
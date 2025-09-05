import type { Product } from "../Entities/Product";
import type { ProductReview } from "../Entities/ProductReview";
import { stringToNumber } from "./stringToNumber";

export const productFactory = (id: string, ...reviews: ProductReview[]): Product => ({
    id: id,
    name: `${id}-name`,
    category: `${id}-category`,
    description: Promise.resolve(`${id}-description`),
    stockQuantity: Promise.resolve(stringToNumber(id)),
    price: Promise.resolve((() => {
        const p = stringToNumber(id);

        return p + p / 100;
    })()),
    reviews,
    image: Promise.resolve(new URL(`http://${id}-image.com`))
});
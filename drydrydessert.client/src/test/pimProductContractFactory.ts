import type { Product } from "../clients/pim";
import { stringToNumber } from "./stringToNumber";

export const pimProductContractFactory = (id: string): Product => ({
    id: id,
    name: `${id}-name`,
    description: `${id}-description`,
    quantityInStock: stringToNumber(id),
    pricePerUnit: (() => {
        const p = stringToNumber(id);

        return p + p / 100;
    })(),
    image: `${id}-image`
});
import type { ProductReview } from "../clients/server";
import { stringToNumber } from "./stringToNumber";

export const productReviewContractFactory = (id: string): ProductReview => ({
    content: `${id}-content`,
    sentiment: stringToNumber(id)
});
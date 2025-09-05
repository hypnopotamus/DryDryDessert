import type { ProductReview as ReviewContract } from "../clients/server";
import type { ProductReview } from "./ProductReview";

export const productReviewFromContract = (review: ReviewContract): ProductReview => ({
    content: review.content,
    sentiment: review.sentiment
});
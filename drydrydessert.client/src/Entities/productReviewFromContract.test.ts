import type { ProductReview as ReviewContract } from "../clients/server";
import { productReviewFromContract } from "./productReviewFromContract";
import { productReviewContractFactory } from "../test";

const reviewContract: ReviewContract = productReviewContractFactory("1");

describe("productReviewFromContract", () => {
    it("needs to be tested", () => {
        const review = productReviewFromContract(reviewContract);

        expect(review.content).toBe(reviewContract.content);
        expect(review.sentiment).toBe(reviewContract.sentiment);
    })
});
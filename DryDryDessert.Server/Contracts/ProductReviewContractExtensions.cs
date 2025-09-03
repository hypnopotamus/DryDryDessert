using DryDryDessert.FakeProducts;

namespace DryDryDessert.Server.Contracts;

public static class ProductReviewContractExtensions
{
    public static IEnumerable<ProductReview> ToContract(this IEnumerable<IProductReview> reviews) =>
        reviews.Select
        (
            r => new ProductReview
            (
                r.Content,
                r.Sentiment
            )
        );

    public static IProductReview FromContract(this ProductReview review) =>
        new FakeProducts.ProductReview
        (
            review.Content,
            review.Sentiment
        );
}
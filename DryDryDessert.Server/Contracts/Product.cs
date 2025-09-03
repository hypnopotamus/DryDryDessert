namespace DryDryDessert.Server.Contracts;

public record Product
(
    Guid Id,
    string Name,
    string Type,
    IEnumerable<ProductReview> Reviews
);
using System.ComponentModel.DataAnnotations;

namespace DryDryDessert.FakeProducts;

public interface IPimProduct
{
    Guid Id { get; }
    string Name { get; }
    string Description { get; }
    int QuantityInStock { get; }
    decimal PricePerUnit { get; }
}

public interface IProduct
{
    Guid Id { get; }
    string Name { get; }
    string Type { get; }
    IReadOnlyCollection<IProductReview> Reviews { get; }
}

public interface IProductReview
{
    string Content { get; }
    double Sentiment { get; }
}

public record Product
(
    Guid Id,
    string Name,
    string Description,
    int QuantityInStock,
    decimal PricePerUnit,
    string Type,
    IReadOnlyCollection<ProductReview> Reviews
) : IProduct, IPimProduct
{
    IReadOnlyCollection<IProductReview> IProduct.Reviews => Reviews;
};

public record ProductReview
(
    string Content,
    [property: Range(-1, 1)]
    double Sentiment
) : IProductReview;
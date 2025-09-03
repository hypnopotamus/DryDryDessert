using DryDryDessert.FakeProducts;

namespace DryDryDessert.Server.Contracts;

public static class ProductContractExtensions
{
    public static IEnumerable<Product> ToContract(this IEnumerable<IProduct> products) =>
        products.Select(ToContract);

    public static Product ToContract(this IProduct product) =>
        new
        (
            product.Id,
            product.Name,
            product.Type,
            product.Reviews.ToContract()
        );
}
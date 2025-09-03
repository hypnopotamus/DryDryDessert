using DryDryDessert.FakeProducts;

namespace DryDryDessert.ProductInformationManagement.Contracts;

public static class ProductContractExtensions
{
    public static Product ToContract(this IPimProduct pimProduct) =>
        new
        (
            pimProduct.Id,
            pimProduct.Name,
            pimProduct.Description,
            pimProduct.QuantityInStock,
            pimProduct.PricePerUnit
        );
}
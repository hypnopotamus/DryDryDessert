namespace DryDryDessert.ProductInformationManagement.Contracts;

public record Product
(
    Guid Id,
    string Name,
    string Description,
    int QuantityInStock,
    decimal PricePerUnit
);
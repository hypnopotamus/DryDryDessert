namespace DryDryDessert.FakeProducts;

public interface IProductInformationRepository
{
    Task<IPimProduct> GetProduct(Guid id);
    Task RecordPurchase(Guid id, int quantity);
}
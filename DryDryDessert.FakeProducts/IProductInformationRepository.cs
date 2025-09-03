namespace DryDryDessert.FakeProducts;

public interface IProductInformationRepository
{
    Task<IPimProduct> GetProduct(Guid id);
}
namespace DryDryDessert.FakeProducts;

public interface IProductRepository
{
    Task<IReadOnlyCollection<IProduct>> GetAllProducts();
    Task<IProduct> GetProduct(Guid id);
    Task AddProductReview(Guid id, string review);
}
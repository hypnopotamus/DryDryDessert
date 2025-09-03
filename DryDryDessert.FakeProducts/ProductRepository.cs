namespace DryDryDessert.FakeProducts;

public class ProductRepository : IProductRepository, IProductInformationRepository
{
    public Task<IReadOnlyCollection<IProduct>> GetAllProducts() =>
        Task.FromResult<IReadOnlyCollection<IProduct>>
        (
            _products.Values.ToList()
        );

    Task<IProduct> IProductRepository.GetProduct(Guid id) =>
        Task.FromResult<IProduct>
        (
            _products[id]
        );

    public Task AddProductReview(Guid productId, IProductReview review)
    {
        var product = _products[productId];
        _products[productId] = product with
        {
            Reviews =
            [
                ..product.Reviews,
                new ProductReview(review.Content, review.Sentiment)
            ]
        };

        return Task.CompletedTask;
    }

    Task<IPimProduct> IProductInformationRepository.GetProduct(Guid id) =>
        Task.FromResult<IPimProduct>
        (
            _products[id]
        );

    private readonly Dictionary<Guid, Product> _products = new()
    {
        [new Guid("D407A0DB-EDCB-4168-A138-5B590717FF05")] = new Product
        (
            new Guid("D407A0DB-EDCB-4168-A138-5B590717FF05"),
            "Drill",
            "a Drill",
            5,
            225.99M,
            "Power Tool",
            []
        ),
        [new Guid("94B606FC-2F60-4061-A215-4BDCF38C0718")] = new Product
        (
            new Guid("94B606FC-2F60-4061-A215-4BDCF38C0718"),
            "Battery",
            "9V Battery",
            500,
            8.99M,
            "Battery",
            [
                new ProductReview
                (
                    "What a piece of crap! It zapped me when I put it on my tongue but it wouldn't power my remote!",
                    -1
                )
            ]
        ),
        [new Guid("3FD07E15-096C-40C6-9FD2-DD83F73222B2")] = new Product
        (
            new Guid("3FD07E15-096C-40C6-9FD2-DD83F73222B2"),
            "Saw",
            "Power Saw, cuts anything",
            0,
            300.99M,
            "Power Tool",
            []
        ),
        [new Guid("8C00FA8E-6279-47A1-93B5-A64C99EF37FE")] = new Product
        (
            new Guid("8C00FA8E-6279-47A1-93B5-A64C99EF37FE"),
            "Pillow",
            "SuperSoft™️ pillow",
            75,
            29.99M,
            "Home Good",
            []
        ),
        [new Guid("15EF47C4-5B82-4447-BB25-67F23A6276C8")] = new Product
        (
            new Guid("15EF47C4-5B82-4447-BB25-67F23A6276C8"),
            "TV",
            "48\" television, 3 HDMI inputs, Google Chromeast™️ built-in",
            3,
            499.99M,
            "Home Appliance",
            [
                new ProductReview
                (
                    "I can see so many things on this TV!",
                    1
                )
            ]
        ),
        [new Guid("19BE4522-7CEA-4EE3-9C33-283389AE8035")] = new Product
        (
            new Guid("19BE4522-7CEA-4EE3-9C33-283389AE8035"),
            "Socks",
            "12 pack men's crew socks",
            50,
            3.99M,
            "Clothing",
            []
        ),
        [new Guid("730BE43D-ECF2-4EDE-9A8E-0C1C564DE96D")] = new Product
        (
            new Guid("730BE43D-ECF2-4EDE-9A8E-0C1C564DE96D"),
            "T-shirt",
            "black women's T-shirt, size medium",
            100,
            2.99M,
            "Clothing",
            []
        ),
        [new Guid("46AD4D55-36D3-4EA4-8047-A2E71F2D43C5")] = new Product
        (
            new Guid("46AD4D55-36D3-4EA4-8047-A2E71F2D43C5"),
            "Bumble Bee Broach",
            "24k gold bumblebee pin/broach encrusted with diamonds",
            1,
            5000.00M,
            "Jewelry",
            []
        ),
        [new Guid("B12036A4-CEF7-43F2-9B68-C6A348E2A524")] = new Product
        (
            new Guid("B12036A4-CEF7-43F2-9B68-C6A348E2A524"),
            "Mood Ring",
            "Tell your friends when you're in a bad mood without having to snap at them!",
            25,
            5.99M,
            "Jewelry",
            []
        ),
    };
}
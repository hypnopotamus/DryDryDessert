using DryDryDessert.FakeProducts;
using DryDryDessert.Server.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DryDryDessert.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IProductRepository products) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<Contracts.Product>> Get() => (await products.GetAllProducts()).ToContract();

    [HttpGet("{id:guid}")]
    public async Task<Contracts.Product> Get(Guid id) => (await products.GetProduct(id)).ToContract();

    [HttpPost("{id:guid}/reviews")]
    public async Task Post(Guid id, [FromBody] string review) => await products.AddProductReview(id, review);
}
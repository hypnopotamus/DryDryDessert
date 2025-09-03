using DryDryDessert.FakeProducts;
using DryDryDessert.ProductInformationManagement.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DryDryDessert.ProductInformationManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IProductInformationRepository products) : ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<Contracts.Product> GetProductInformation(Guid id) => (await products.GetProduct(id)).ToContract();
}
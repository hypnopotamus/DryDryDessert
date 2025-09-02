var builder = DistributedApplication.CreateBuilder(args);

var pim = builder.AddProject<Projects.DryDryDessert_ProductInformationManagement>("pim");
var api = builder.AddProject<Projects.DryDryDessert_Server>("server");
var ui = builder.AddNpmApp
    (
        "client",
        Path.GetDirectoryName(new Projects.drydrydessert_client().ProjectPath) ?? throw new InvalidOperationException(),
        "dev"
    )
    .WithEnvironment("DEV_SERVER_PORT", "49675")
    .WithHttpsEndpoint(port: 49675, isProxied: false)
    .WithReference(pim)
    .WithReference(api);

builder.AddNpmApp(
    "end-to-end",
    Path.GetDirectoryName(new Projects.DryDryDessert_EndToEndTest().ProjectPath) ?? throw new InvalidOperationException(),
    "test"
)
.WithExplicitStart()
.WithReference(ui);

builder.Build().Run();
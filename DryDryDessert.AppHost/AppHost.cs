var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.DryDryDessert_Server>("server");
builder.AddNpmApp
    (
        "client",
        Path.GetDirectoryName(new Projects.drydrydessert_client().ProjectPath) ?? throw new InvalidOperationException(),
        "dev"
    )
    .WithEnvironment("DEV_SERVER_PORT", "49675")
    .WithHttpsEndpoint(port: 49675, isProxied: false);

builder.Build().Run();
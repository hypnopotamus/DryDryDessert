var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.DryDryDessert_Server>("drydrydessert-server");

builder.Build().Run();

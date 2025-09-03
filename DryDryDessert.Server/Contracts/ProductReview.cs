using System.ComponentModel.DataAnnotations;

namespace DryDryDessert.Server.Contracts;

public record ProductReview
(
    string Content,
    [property: Range(-1, 1)]
    double Sentiment
);
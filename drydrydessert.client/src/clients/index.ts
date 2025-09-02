import { WeatherForecastApi as server, type WeatherForecastApiInterface as serverInterface } from "./server";
import { WeatherForecastApi as pim, type WeatherForecastApiInterface as pimInterface } from "./pim";

//todo: configuration for the API bast paths
//todo: this generator is wrong about nullable types and there appears to be no fix for it
//  the recommendation is to change the emitted schema to include the required: [] property
//   ... which seems to require a custom schema transformer, even though .net's built-in open api already respects nullability correctly
export const serverClientFactory = (): serverInterface => new server();
export const pimClientFactory = (): pimInterface => new pim();
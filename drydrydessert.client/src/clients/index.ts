import { Configuration as serverConfiguration, WeatherForecastApi as server, type WeatherForecastApiInterface as serverInterface } from "./server";
import { Configuration as pimConfiguration, WeatherForecastApi as pim, type WeatherForecastApiInterface as pimInterface } from "./pim";

//todo: this generator is wrong about nullable types and there appears to be no fix for it
//  asp's built-in open api spec generator already integrates with and handles nullable annotations correctly
//  but the workaround to make this client generator work correctly requires modifying the produced schema to explicitly list the required parameters
//    because it ignores the nullable: true|false (or lack of meaning required) of the properties in the schema
export const serverClientFactory = (): serverInterface => new server(new serverConfiguration({ basePath: '/api' }));
export const pimClientFactory = (): pimInterface => new pim(new pimConfiguration({ basePath: '/pim' }));
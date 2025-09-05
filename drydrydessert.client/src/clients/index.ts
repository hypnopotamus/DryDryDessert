import { Configuration as serverConfiguration, ProductsApi as server, type ProductsApiInterface as serverInterface } from "./server";
import { Configuration as pimConfiguration, ProductsApi as pim, type ProductsApiInterface as pimInterface } from "./pim";

const clientFactory = <I, TClient extends I, TConfig>(
    client: { new(c: TConfig): TClient },
    config: { new(cc: { basePath: string }): TConfig },
    basePath: string
): I => {
    return new client(new config({ basePath }));
};

export const serverClient = clientFactory<serverInterface, server, serverConfiguration>(server, serverConfiguration, '/api');
export const pimClient = clientFactory<pimInterface, pim, pimConfiguration>(pim, pimConfiguration, '/pim');
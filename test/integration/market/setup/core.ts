/**
 * @author WMXPY
 * @namespace Market
 * @description Core
 * @override Setup
 */

import { Mipha, MiphaStorageProxy, MiphaStorageProxyBuilder } from "../../../../src";
import { MiphaRecipeMetadataConfig } from "../../../../src/recipe/declare";
import { marketFruitModule } from "./module";
import { defaultFruitRecipeConfig, defaultFruitRecipeMetadataConfig } from "./recipe";

const storageProxy: MiphaStorageProxy = MiphaStorageProxy.fromBuilder(
    MiphaStorageProxyBuilder.fromScratch()
        .withGetAllRecipesMethod(() => [
            defaultFruitRecipeMetadataConfig,
        ])
        .withPutRecipesMethod(() => void 0)
        .withGetSingleRecipeMethod((metadata: MiphaRecipeMetadataConfig) => {
            switch (metadata.identifier) {
                case 'integration-recipe.market.fruit':
                    return defaultFruitRecipeConfig;
            }
            return null;
        })
        .withGetAllScriptsMethod(() => [])
        .withPutScriptsMethod(() => void 0)
        .withGetSingleScriptMethod(() => null as any)
        .withReadConfigMethod(() => ({} as any))
        .withSaveConfigMethod(() => void 0)
);

export const marketMiphaCore = Mipha.fromConfig({
    storageProxy,
});

marketMiphaCore.useModule(marketFruitModule);

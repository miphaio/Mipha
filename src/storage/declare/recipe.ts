/**
 * @author WMXPY
 * @namespace Storage_Declare
 * @description Recipe
 */

import { MiphaRecipeConfig, MiphaRecipeMetadataConfig } from "../../recipe/declare";
import { NullablePromiseOrSync, PromiseOrSync } from "../../util/promise-or-sync";

// Public
export type MiphaStorageProxyGetAllRecipesMethod = () => PromiseOrSync<Iterable<MiphaRecipeMetadataConfig>>;

// Public
export type MiphaStorageProxyPutRecipesMethod = (
    recipes: MiphaRecipeConfig[],
) => PromiseOrSync<void>;

// Public
export type MiphaStorageProxyGetSingleRecipeMethod = (
    metadata: MiphaRecipeMetadataConfig,
) => NullablePromiseOrSync<MiphaRecipeConfig>;

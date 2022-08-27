/**
 * @author WMXPY
 * @namespace Storage
 * @description Declare
 */

import { MiphaStorageProxyReadConfigMethod, MiphaStorageProxySaveConfigMethod } from "./declare/config";
import { MiphaStorageProxyGetAllRecipesMethod, MiphaStorageProxyGetSingleRecipeMethod, MiphaStorageProxyPutRecipesMethod } from "./declare/recipe";
import { MiphaStorageProxyGetAllScriptsMethod, MiphaStorageProxyGetSingleScriptMethod, MiphaStorageProxyPutScriptsMethod } from "./declare/script";

// Internal
export type MiphaStorageProxyConstructConfig = {

    readonly readConfigMethod: MiphaStorageProxyReadConfigMethod;
    readonly saveConfigMethod: MiphaStorageProxySaveConfigMethod;

    readonly getAllRecipesMethod: MiphaStorageProxyGetAllRecipesMethod;
    readonly putRecipesMethod: MiphaStorageProxyPutRecipesMethod;
    readonly getSingleRecipeMethod: MiphaStorageProxyGetSingleRecipeMethod;

    readonly getAllScriptsMethod: MiphaStorageProxyGetAllScriptsMethod;
    readonly putScriptsMethod: MiphaStorageProxyPutScriptsMethod;
    readonly getSingleScriptMethod: MiphaStorageProxyGetSingleScriptMethod;
};

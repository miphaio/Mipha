/**
 * @author WMXPY
 * @namespace Storage
 * @description Proxy
 */

import { MiphaRecipeConfig, MiphaRecipeMetadataConfig } from "../recipe/declare";
import { MiphaScriptConfig, MiphaScriptMetadataConfig } from "../script/declare";
import { NullablePromise } from "../util/promise-or-sync";
import { MiphaStorageProxyConstructConfig } from "./declare";
import { MiphaStorageConfig, MiphaStorageProxyReadConfigMethod, MiphaStorageProxySaveConfigMethod } from "./declare/config";
import { MiphaStorageProxyGetAllRecipesMethod, MiphaStorageProxyGetSingleRecipeMethod, MiphaStorageProxyPutRecipesMethod } from "./declare/recipe";
import { MiphaStorageProxyGetAllScriptsMethod, MiphaStorageProxyGetSingleScriptMethod, MiphaStorageProxyPutScriptsMethod } from "./declare/script";
import { MiphaStorageProxyBuilder } from "./proxy-builder";

// Public
export class MiphaStorageProxy {

    public static fromBuilder(builder: MiphaStorageProxyBuilder): MiphaStorageProxy {

        return new MiphaStorageProxy(
            builder.buildConstructConfig(),
        );
    }

    private readonly _readConfigMethod: MiphaStorageProxyReadConfigMethod;
    private readonly _saveConfigMethod: MiphaStorageProxySaveConfigMethod;

    private readonly _getAllRecipesMethod: MiphaStorageProxyGetAllRecipesMethod;
    private readonly _putRecipesMethod: MiphaStorageProxyPutRecipesMethod;
    private readonly _getSingleRecipeMethod: MiphaStorageProxyGetSingleRecipeMethod;

    private readonly _getAllScriptsMethod: MiphaStorageProxyGetAllScriptsMethod;
    private readonly _putScriptsMethod: MiphaStorageProxyPutScriptsMethod;
    private readonly _getSingleScriptMethod: MiphaStorageProxyGetSingleScriptMethod;

    private constructor(config: MiphaStorageProxyConstructConfig) {

        this._readConfigMethod = config.readConfigMethod;
        this._saveConfigMethod = config.saveConfigMethod;

        this._getAllRecipesMethod = config.getAllRecipesMethod;
        this._putRecipesMethod = config.putRecipesMethod;
        this._getSingleRecipeMethod = config.getSingleRecipeMethod;

        this._getAllScriptsMethod = config.getAllScriptsMethod;
        this._putScriptsMethod = config.putScriptsMethod;
        this._getSingleScriptMethod = config.getSingleScriptMethod;
    }

    public async readConfig(): NullablePromise<MiphaStorageConfig> {
        return await Promise.resolve(
            this._readConfigMethod(),
        );
    }
    public async saveConfig(config: MiphaStorageConfig): Promise<void> {
        return await Promise.resolve(
            this._saveConfigMethod(config),
        );
    }

    public async getAllRecipes(): Promise<Iterable<MiphaRecipeMetadataConfig>> {
        return await Promise.resolve(
            this._getAllRecipesMethod(),
        );
    }
    public async putRecipes(recipes: MiphaRecipeConfig[]): Promise<void> {
        return await Promise.resolve(
            this._putRecipesMethod(recipes),
        );
    }
    public async getSingleRecipe(config: MiphaRecipeMetadataConfig): NullablePromise<MiphaRecipeConfig> {
        return await Promise.resolve(
            this._getSingleRecipeMethod(config),
        );
    }

    public async getAllScripts(): Promise<Iterable<MiphaScriptMetadataConfig>> {
        return await Promise.resolve(
            this._getAllScriptsMethod(),
        );
    }
    public async putScripts(scripts: MiphaScriptConfig[]): Promise<void> {
        return await Promise.resolve(
            this._putScriptsMethod(scripts),
        );
    }
    public async getSingleScript(config: MiphaScriptMetadataConfig): NullablePromise<MiphaScriptConfig> {
        return await Promise.resolve(
            this._getSingleScriptMethod(config),
        );
    }
}

/**
 * @author WMXPY
 * @namespace Storage
 * @description Proxy Builder
 */

import { ERROR_CODE, panic } from "../util/error";
import { MiphaStorageProxyConstructConfig } from "./declare";
import { MiphaStorageProxyReadConfigMethod, MiphaStorageProxySaveConfigMethod } from "./declare/config";
import { MiphaStorageProxyGetAllRecipesMethod, MiphaStorageProxyGetSingleRecipeMethod, MiphaStorageProxyPutRecipesMethod } from "./declare/recipe";
import { MiphaStorageProxyGetAllScriptsMethod, MiphaStorageProxyGetSingleScriptMethod, MiphaStorageProxyPutScriptsMethod } from "./declare/script";

// Public
export class MiphaStorageProxyBuilder {

    public static fromScratch(): MiphaStorageProxyBuilder {

        return new MiphaStorageProxyBuilder();
    }

    private _readConfigMethod: MiphaStorageProxyReadConfigMethod | undefined;
    private _saveConfigMethod: MiphaStorageProxySaveConfigMethod | undefined;

    private _getAllRecipesMethod: MiphaStorageProxyGetAllRecipesMethod | undefined;
    private _putRecipesMethod: MiphaStorageProxyPutRecipesMethod | undefined;
    private _getSingleRecipeMethod: MiphaStorageProxyGetSingleRecipeMethod | undefined;

    private _getAllScriptsMethod: MiphaStorageProxyGetAllScriptsMethod | undefined;
    private _putScriptsMethod: MiphaStorageProxyPutScriptsMethod | undefined;
    private _getSingleScriptMethod: MiphaStorageProxyGetSingleScriptMethod | undefined;

    private constructor() {

        this._readConfigMethod = undefined;
        this._saveConfigMethod = undefined;

        this._getAllRecipesMethod = undefined;
        this._putRecipesMethod = undefined;
        this._getSingleRecipeMethod = undefined;

        this._getAllScriptsMethod = undefined;
        this._putScriptsMethod = undefined;
        this._getSingleScriptMethod = undefined;
    }

    public getReadConfigMethodOrThrow(): MiphaStorageProxyReadConfigMethod {

        if (typeof this._readConfigMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'readConfigMethod');
        }
        return this._readConfigMethod;
    }

    public withReadConfigMethod(readConfigMethod: MiphaStorageProxyReadConfigMethod): this {

        this._readConfigMethod = readConfigMethod;
        return this;
    }

    public getSaveConfigMethodOrThrow(): MiphaStorageProxySaveConfigMethod {

        if (typeof this._saveConfigMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'saveConfigMethod');
        }
        return this._saveConfigMethod;
    }

    public withSaveConfigMethod(saveConfigMethod: MiphaStorageProxySaveConfigMethod): this {

        this._saveConfigMethod = saveConfigMethod;
        return this;
    }

    public getGetAllRecipesMethodOrThrow(): MiphaStorageProxyGetAllRecipesMethod {

        if (typeof this._getAllRecipesMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'getAllRecipesMethod');
        }
        return this._getAllRecipesMethod;
    }

    public withGetAllRecipesMethod(getAllRecipesMethod: MiphaStorageProxyGetAllRecipesMethod): this {

        this._getAllRecipesMethod = getAllRecipesMethod;
        return this;
    }

    public getPutRecipesMethodOrThrow(): MiphaStorageProxyPutRecipesMethod {

        if (typeof this._putRecipesMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'putRecipesMethod');
        }
        return this._putRecipesMethod;
    }

    public withPutRecipesMethod(putRecipesMethod: MiphaStorageProxyPutRecipesMethod): this {

        this._putRecipesMethod = putRecipesMethod;
        return this;
    }

    public getGetSingleRecipeMethodOrThrow(): MiphaStorageProxyGetSingleRecipeMethod {

        if (typeof this._getSingleRecipeMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'getSingleRecipeMethod');
        }
        return this._getSingleRecipeMethod;
    }

    public withGetSingleRecipeMethod(getSingleRecipeMethod: MiphaStorageProxyGetSingleRecipeMethod): this {

        this._getSingleRecipeMethod = getSingleRecipeMethod;
        return this;
    }

    public getGetAllScriptsMethodOrThrow(): MiphaStorageProxyGetAllScriptsMethod {

        if (typeof this._getAllScriptsMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'getAllScriptsMethod');
        }
        return this._getAllScriptsMethod;
    }

    public withGetAllScriptsMethod(getAllScriptsMethod: MiphaStorageProxyGetAllScriptsMethod): this {

        this._getAllScriptsMethod = getAllScriptsMethod;
        return this;
    }

    public getPutScriptsMethodOrThrow(): MiphaStorageProxyPutScriptsMethod {

        if (typeof this._putScriptsMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'putScriptsMethod');
        }
        return this._putScriptsMethod;
    }

    public withPutScriptsMethod(putScriptsMethod: MiphaStorageProxyPutScriptsMethod): this {

        this._putScriptsMethod = putScriptsMethod;
        return this;
    }

    public getGetSingleScriptMethodOrThrow(): MiphaStorageProxyGetSingleScriptMethod {

        if (typeof this._getSingleScriptMethod !== 'function') {
            throw panic.code(ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1, 'getSingleScriptMethod');
        }
        return this._getSingleScriptMethod;
    }

    public withGetSingleScriptMethod(getSingleScriptMethod: MiphaStorageProxyGetSingleScriptMethod): this {

        this._getSingleScriptMethod = getSingleScriptMethod;
        return this;
    }

    public buildConstructConfig(): MiphaStorageProxyConstructConfig {

        return {
            readConfigMethod: this.getReadConfigMethodOrThrow(),
            saveConfigMethod: this.getSaveConfigMethodOrThrow(),
            getAllRecipesMethod: this.getGetAllRecipesMethodOrThrow(),
            putRecipesMethod: this.getPutRecipesMethodOrThrow(),
            getSingleRecipeMethod: this.getGetSingleRecipeMethodOrThrow(),
            getAllScriptsMethod: this.getGetAllScriptsMethodOrThrow(),
            putScriptsMethod: this.getPutScriptsMethodOrThrow(),
            getSingleScriptMethod: this.getGetSingleScriptMethodOrThrow(),
        };
    }
}

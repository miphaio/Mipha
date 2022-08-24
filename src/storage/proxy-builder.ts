/**
 * @author WMXPY
 * @namespace Storage
 * @description Proxy Builder
 */

import { ERROR_CODE, panic } from "../util/error";
import { MiphaStorageProxyReadConfigMethod, MiphaStorageProxySaveConfigMethod } from "./declare";

// Public
export class MiphaStorageProxyBuilder {

    private _readConfigMethod: MiphaStorageProxyReadConfigMethod | undefined;
    private _saveConfigMethod: MiphaStorageProxySaveConfigMethod | undefined;

    private constructor() {

        this._readConfigMethod = undefined;
        this._saveConfigMethod = undefined;
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
}

/**
 * @author WMXPY
 * @namespace Storage
 * @description Proxy
 */

import { MiphaStorageProxyReadConfigMethod, MiphaStorageProxySaveConfigMethod } from "./declare";
import { MiphaStorageProxyBuilder } from "./proxy-builder";

// Public
export class MiphaStorageProxy {

    public static fromBuilder(builder: MiphaStorageProxyBuilder): MiphaStorageProxy {

        return new MiphaStorageProxy(
            builder.getReadConfigMethodOrThrow(),
            builder.getSaveConfigMethodOrThrow(),
        );
    }

    private readonly _readConfigMethod: MiphaStorageProxyReadConfigMethod;
    private readonly _saveConfigMethod: MiphaStorageProxySaveConfigMethod;

    private constructor(
        readConfigMethod: MiphaStorageProxyReadConfigMethod,
        saveConfigMethod: MiphaStorageProxySaveConfigMethod,
    ) {

        this._readConfigMethod = readConfigMethod;
        this._saveConfigMethod = saveConfigMethod;
    }
}

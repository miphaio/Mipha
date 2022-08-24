/**
 * @author WMXPY
 * @namespace Mipha
 * @description Mipha
 */

import { MiphaStorageProxy } from "../storage/proxy";

export type MiphaConfig = {

    readonly storageProxy: MiphaStorageProxy;
};

// Public
export class Mipha {

    public static fromConfig(config: MiphaConfig): Mipha {

        return new Mipha(config);
    }

    private readonly _storageProxy: MiphaStorageProxy;

    private constructor(config: MiphaConfig) {

        this._storageProxy = config.storageProxy;
    }
}

/**
 * @author WMXPY
 * @namespace Storage_Declare
 * @description Config
 */

import { NullablePromiseOrSync, PromiseOrSync } from "../../util/promise-or-sync";

// Public
export type MiphaStorageProxyReadConfigMethod = () => NullablePromiseOrSync<MiphaStorageConfig>;

// Public
export type MiphaStorageProxySaveConfigMethod = (
    config: MiphaStorageConfig,
) => PromiseOrSync<void>;

// Public
export type MiphaStorageConfig = {

    readonly version: "1.0";
};

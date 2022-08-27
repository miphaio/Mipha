/**
 * @author WMXPY
 * @namespace Storage_Declare
 * @description Script
 */

import { MiphaScriptConfig, MiphaScriptMetadataConfig } from "../../script/declare";
import { NullablePromiseOrSync, PromiseOrSync } from "../../util/promise-or-sync";

// Public
export type MiphaStorageProxyGetAllScriptsMethod = () => PromiseOrSync<Iterable<MiphaScriptMetadataConfig>>;

// Public
export type MiphaStorageProxyPutScriptsMethod = (
    scripts: MiphaScriptConfig[],
) => PromiseOrSync<void>;

// Public
export type MiphaStorageProxyDeleteScriptsMethod = (
    scripts: MiphaScriptMetadataConfig[],
) => PromiseOrSync<void>;

// Public
export type MiphaStorageProxyGetSingleScriptMethod = (
    metadata: MiphaScriptMetadataConfig,
) => NullablePromiseOrSync<MiphaScriptConfig>;

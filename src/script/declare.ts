/**
 * @author WMXPY
 * @namespace Script
 * @description Declare
 */

// Public
export type MiphaScriptConfig = {

    readonly metadata: MiphaScriptMetadataConfig;
    readonly scriptCode: string;
};

// Public
export type MiphaScriptMetadataConfig = {

    readonly requirements: string[];
};

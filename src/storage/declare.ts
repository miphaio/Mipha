/**
 * @author WMXPY
 * @namespace Storage
 * @description Declare
 */

// Public
export type MiphaStorageProxyReadConfigMethod = () => Promise<MiphaStorageConfig> | MiphaStorageConfig;

// Public
export type MiphaStorageProxySaveConfigMethod = (config: MiphaStorageConfig) => Promise<void>;

// Public
export type MiphaStorageRecipeConfig = {

    readonly identifier: string;
};

// Public
export type MiphaStorageConfig = {

    readonly availableRecipes: MiphaStorageRecipeConfig[];
};

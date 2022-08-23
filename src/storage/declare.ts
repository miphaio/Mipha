/**
 * @author WMXPY
 * @namespace Storage
 * @description Declare
 */

// Public
export type MiphaStorageRecipeConfig = {

    readonly identifier: string;
};

// Public
export type MiphaStorageConfig = {

    readonly availableRecipes: MiphaStorageRecipeConfig[];
};

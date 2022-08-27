/**
 * @author WMXPY
 * @namespace Recipe
 * @description Declare
 */

import { MiphaPermissionConfig } from "../permission/declare";

// Public
export type MiphaRecipeConfig = {

    readonly metadata: MiphaRecipeMetadataConfig;
    readonly recipeCode: string;
};

// Public
export type MiphaRecipeMetadataConfig = {

    readonly identifier: string;
    readonly requiredPermissions: MiphaPermissionConfig[];
};

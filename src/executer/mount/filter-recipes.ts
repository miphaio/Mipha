/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Filter Recipes
 */

import { MiphaPermission } from "../../permission/permission";
import { MiphaRecipe } from "../../recipe/recipe";

export const filterMiphaRecipesByPermissions = (
    recipes: Iterable<MiphaRecipe>,
    permissions: Iterable<MiphaPermission>,
): Set<MiphaRecipe> => {

    const permissionMap: Map<string, MiphaPermission> = new Map();
    for (const permission of permissions) {
        permissionMap.set(permission.identifier, permission);
    }

    const filtered: Set<MiphaRecipe> = new Set();
    for (const recipe of recipes) {
        if (permissionMap.has(recipe.identifier)) {
            filtered.add(recipe);
        }
    }
    return filtered;
};

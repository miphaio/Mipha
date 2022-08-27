/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Analyze Dependencies
 */

import { MiphaModule } from "../../module/module";
import { MiphaRecipe } from "../../recipe/recipe";
import { MiphaPermission } from "../permission";

// Public
export type AnalyzeDependenciesRecipeResult = {

    readonly identifier: string;
    readonly recipe: MiphaRecipe;
    readonly permissions: MiphaPermission[];
};

// Public
export type AnalyzeDependenciesModuleResult = {

    readonly identifier: string;
    readonly module: MiphaModule;
    readonly permissions: MiphaPermission[];
};

// Public
export type AnalyzeDependenciesResult = {

    readonly overall: MiphaPermission[];
    readonly recipes: AnalyzeDependenciesRecipeResult[];
    readonly modules: AnalyzeDependenciesModuleResult[];
};

// Public
export const analyzeDependencies = (
    dependencies: string[],
    recipes: MiphaRecipe[],
    modules: MiphaModule[],
): AnalyzeDependenciesResult => {

};

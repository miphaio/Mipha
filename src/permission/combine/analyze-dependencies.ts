/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Analyze Dependencies
 */

import { MiphaModule } from "../../module/module";
import { MiphaRecipe } from "../../recipe/recipe";
import { ERROR_CODE, panic } from "../../util/error";
import { MiphaPermission } from "../permission";
import { combinePermissions } from "./combine-permissions";

// Public
export type AnalyzeDependenciesRecipeResult = {

    readonly identifier: string;
    readonly recipe: MiphaRecipe;
    readonly permissions: Iterable<MiphaPermission>;
};

// Public
export type AnalyzeDependenciesModuleResult = {

    readonly identifier: string;
    readonly module: MiphaModule;
    readonly permissions: Iterable<MiphaPermission>;
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

    const overall: MiphaPermission[] = [];
    const recipesResult: AnalyzeDependenciesRecipeResult[] = [];
    const modulesResult: AnalyzeDependenciesModuleResult[] = [];

    dependencies: for (const dependency of dependencies) {

        const recipe: MiphaRecipe | undefined =
            recipes.find((value: MiphaRecipe) => value.identifier === dependency);

        if (typeof recipe !== 'undefined') {

            recipesResult.push({
                identifier: dependency,
                recipe,
                permissions: combinePermissions(recipe.metadata.requiredPermissions),
            });
            overall.push(...recipe.metadata.requiredPermissions);

            continue dependencies;
        }

        const module: MiphaModule | undefined =
            modules.find((value: MiphaModule) => value.identifier === dependency);

        if (typeof module !== 'undefined') {

            modulesResult.push({
                identifier: dependency,
                module,
                permissions: combinePermissions(module.requiredPermissions),
            });
            overall.push(...module.requiredPermissions);

            continue dependencies;
        }

        throw panic.code(ERROR_CODE.CORRESPONDED_DEPENDENCY_NOT_FOUND_1, dependency);
    }

    return {

        overall: combinePermissions(overall),
        recipes: recipesResult,
        modules: modulesResult,
    };
};

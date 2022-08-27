/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Analyze Dependencies
 */

import { MiphaModule } from "../../module/module";
import { MiphaRecipeMetadata } from "../../recipe/metadata";
import { ERROR_CODE, panic } from "../../util/error";
import { MiphaPermission } from "../permission";
import { combinePermissions } from "./combine-permissions";

// Public
export type AnalyzeDependenciesRecipeResult = {

    readonly identifier: string;
    readonly recipeMetadata: MiphaRecipeMetadata;
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
    dependencies: Iterable<string>,
    recipes: MiphaRecipeMetadata[],
    modules: MiphaModule[],
): AnalyzeDependenciesResult => {

    const overall: MiphaPermission[] = [];
    const recipesResult: AnalyzeDependenciesRecipeResult[] = [];
    const modulesResult: AnalyzeDependenciesModuleResult[] = [];

    dependencies: for (const dependency of dependencies) {

        const recipe: MiphaRecipeMetadata | undefined =
            recipes.find((value: MiphaRecipeMetadata) => value.identifier === dependency);

        if (typeof recipe !== 'undefined') {

            recipesResult.push({
                identifier: dependency,
                recipeMetadata: recipe,
                permissions: combinePermissions(recipe.requiredPermissions),
            });
            overall.push(...recipe.requiredPermissions);

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

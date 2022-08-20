/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mount
 */

import { ITrace, ModuleResolveResult, Sandbox, ScriptLocation } from "@sudoo/marked";
import { MiphaModule } from "../../module/module";
import { MiphaRecipeLoadEmptySymbol, MiphaRecipeLoader } from "../../recipe/loader";
import { MiphaRecipe } from "../../recipe/recipe";

// Internal
export const mountMiphaModules = (
    sandbox: Sandbox,
    modules: Set<MiphaModule>,
): void => {

    for (const module of modules) {
        sandbox.provide(module.identifier, module.provides);
    }
    return;
};

// Internal
export const mountMiphaRecipeLoaders = (sandbox: Sandbox, recipeLoaders: Set<MiphaRecipeLoader>): void => {

    sandbox.resolver(
        async (
            source: string,
            _trace: ITrace,
        ): Promise<ModuleResolveResult | null> => {

            for (const recipeLoader of recipeLoaders) {

                const result: MiphaRecipe | typeof MiphaRecipeLoadEmptySymbol =
                    await recipeLoader.load(source);

                if (result instanceof MiphaRecipe) {

                    return {
                        script: result.recipeCode,
                        scriptLocation: ScriptLocation.create('recipe', `${recipeLoader.sourceName}/${source}`),
                    };
                }
            }
            return null;
        },
    );
};

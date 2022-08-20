/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mount
 */

import { ITrace, ModuleResolveResult, Sandbox, ScriptLocation } from "@sudoo/marked";
import { MiphaRecipeLoadEmptySymbol, MiphaRecipeLoader } from "../../recipe/loader";
import { MiphaRecipe } from "../../recipe/recipe";
import { SummarizedMiphaModules } from "./summarize";

// Internal
export const mountMiphaSummarizedModules = (
    sandbox: Sandbox,
    summarizedModules: SummarizedMiphaModules,
): void => {

    const provideKeys: string[] = Object.keys(summarizedModules.provides);
    for (const provideKey of provideKeys) {

        sandbox.provide(provideKey, summarizedModules.provides[provideKey]);
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

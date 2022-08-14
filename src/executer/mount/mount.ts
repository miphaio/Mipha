/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mount
 */

import { ITrace, ModuleResolveResult, Sandbox, ScriptLocation } from "@sudoo/marked";
import { MiphaRecipeLoader } from "../../recipe/loader";
import { SummarizedMiphaModules } from "./summarize";

// Internal
export const mountMiphaSummarizedModules = (sandbox: Sandbox, summarizedModules: SummarizedMiphaModules): void => {

    const provideKeys: string[] = Object.keys(summarizedModules.provides);
    for (const provideKey of provideKeys) {
        sandbox.provide(provideKey, summarizedModules.provides[provideKey]);
    }

    return;
};

// Internal
export const mountMiphaRecipeLoaders = (sandbox: Sandbox, recipeLoaders: Set<MiphaRecipeLoader>): void => {

    sandbox.resolver(async (source: string, _trace: ITrace): Promise<ModuleResolveResult | null> => {

        for (const recipeLoader of recipeLoaders) {

            const result: string | null = await recipeLoader.load(source);

            if (typeof result === 'string') {

                return {
                    script: result,
                    scriptLocation: ScriptLocation.create('recipe', `${recipeLoader.sourceName}/${source}`),
                };
            }
        }

        return null;
    });
};

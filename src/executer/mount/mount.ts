/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mount
 */

import { ITrace, ModuleResolveResult, Sandbox, ScriptLocation } from "@sudoo/marked";
import { MiphaModule } from "../../module/module";
import { MiphaPermissionController } from "../../permission/controller";
import { MiphaRecipeLoadEmptySymbol, MiphaRecipeLoader } from "../../recipe/loader";
import { MiphaRecipe } from "../../recipe/recipe";
import { MiphaExecuterAdditionalArgument } from "../additional-argument";

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
export const mountMiphaRecipeLoader = (sandbox: Sandbox, recipeLoader: MiphaRecipeLoader): void => {

    sandbox.resolver(
        async (
            source: string,
            _trace: ITrace,
        ): Promise<ModuleResolveResult | null> => {

            const result: MiphaRecipe | typeof MiphaRecipeLoadEmptySymbol =
                await recipeLoader.load(source);

            if (result instanceof MiphaRecipe) {

                return {
                    script: result.recipeCode,
                    scriptLocation: ScriptLocation.create('recipe', `${recipeLoader.sourceName}/${source}`),
                };
            }
            return null;
        },
    );
    return;
};

// Internal
export const mountMiphaAdditionalArgument = (
    sandbox: Sandbox,
    permissionController: MiphaPermissionController,
): void => {

    const additionalArgument: MiphaExecuterAdditionalArgument =
        MiphaExecuterAdditionalArgument.create(permissionController);

    sandbox.setAdditionalArgument(additionalArgument);
    return;
};

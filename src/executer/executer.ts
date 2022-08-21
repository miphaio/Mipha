/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { MiphaModule } from "../module/module";
import { MiphaPermission } from "../permission/permission";
import { MiphaRecipe } from "../recipe/recipe";
import { MiphaScript } from "../script/script";
import { ERROR_CODE, panic } from "../util/error";
import { filterMiphaModulesByPermissions } from "./mount/filter-modules";
import { filterMiphaRecipesByPermissions } from "./mount/filter-recipes";
import { MiphaMountedExecuter } from "./mounted-executer";

// Public
export class MiphaExecuter {

    public static fromModules(modules: Set<MiphaModule>): MiphaExecuter {

        return new MiphaExecuter(modules);
    }

    public static fromScratch(): MiphaExecuter {

        const modules: Set<MiphaModule> = new Set<MiphaModule>();
        return new MiphaExecuter(modules);
    }

    private readonly _modules: Set<MiphaModule>;
    private readonly _recipes: Set<MiphaRecipe>;

    private constructor(modules: Set<MiphaModule>) {

        this._modules = modules;
        this._recipes = new Set<MiphaRecipe>();
    }

    public useModule(module: MiphaModule): this {

        for (const existModule of this._modules) {
            if (existModule.identifier === module.identifier) {
                throw panic.code(
                    ERROR_CODE.MODULE_IDENTIFIER_ALREADY_MOUNTED_1,
                    module.identifier,
                );
            }
        }

        this._modules.add(module);
        return this;
    }

    public useRecipe(recipe: MiphaRecipe): this {

        this._recipes.add(recipe);
        return this;
    }

    public mountForScript(
        script: MiphaScript,
        permissions: Iterable<MiphaPermission>,
    ): MiphaMountedExecuter {

        const filteredModules: Set<MiphaModule> =
            filterMiphaModulesByPermissions(this._modules, permissions);
        const filetedRecipes: Set<MiphaRecipe> =
            filterMiphaRecipesByPermissions(this._recipes, permissions);

        return MiphaMountedExecuter.fromModuleAndRecipeSet(
            script,
            filteredModules,
            filetedRecipes,
        );
    }
}

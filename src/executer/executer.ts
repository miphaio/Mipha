/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { MarkedResult } from "@sudoo/marked";
import { MiphaModule } from "../module/module";
import { MiphaPermissionController } from "../permission/controller";
import { MiphaPermission } from "../permission/permission";
import { MiphaRecipe } from "../recipe/recipe";
import { MiphaScript } from "../script/script";
import { ERROR_CODE, panic } from "../util/error";
import { filterMiphaModulesByPermissions } from "./mount/filter-modules";
import { filterMiphaRecipesByPermissions } from "./mount/filter-recipes";
import { MiphaMountedExecuter } from "./mounted-executer";

// Public
export class MiphaExecuter {

    public static fromScratch(): MiphaExecuter {

        return MiphaExecuter.fromModulesAndRecipes([], []);
    }

    public static fromModules(modules: Iterable<MiphaModule>): MiphaExecuter {

        return MiphaExecuter.fromModulesAndRecipes(modules, []);
    }

    public static fromRecipes(recipes: Iterable<MiphaRecipe>): MiphaExecuter {

        return MiphaExecuter.fromModulesAndRecipes([], recipes);
    }

    public static fromModulesAndRecipes(
        modules: Iterable<MiphaModule>,
        recipes: Iterable<MiphaRecipe>,
    ): MiphaExecuter {

        const modulesSet: Set<MiphaModule> = new Set<MiphaModule>(modules);
        const recipesSet: Set<MiphaRecipe> = new Set<MiphaRecipe>(recipes);
        return new MiphaExecuter(modulesSet, recipesSet);
    }

    private readonly _modules: Set<MiphaModule>;
    private readonly _recipes: Set<MiphaRecipe>;

    private constructor(
        modules: Set<MiphaModule>,
        recipes: Set<MiphaRecipe>,
    ) {

        this._modules = modules;
        this._recipes = recipes;
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

        const permissionController: MiphaPermissionController
            = MiphaPermissionController.fromPermissionList(permissions);

        return MiphaMountedExecuter.fromModuleAndRecipeSet(
            script,
            permissionController,
            filteredModules,
            filetedRecipes,
        );
    }

    public async mountAndExecute(
        script: MiphaScript,
        permissions: Iterable<MiphaPermission>,
    ): Promise<MarkedResult> {

        const executer: MiphaMountedExecuter = this.mountForScript(
            script,
            permissions,
        );
        return await executer.execute();
    }
}

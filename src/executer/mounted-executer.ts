/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { MarkedResult, Sandbox, useEverything } from "@sudoo/marked";
import { MiphaModule } from "../module/module";
import { MiphaPermissionController } from "../permission/controller";
import { MiphaRecipeLoader } from "../recipe/loader";
import { MiphaRecipe } from "../recipe/recipe";
import { MiphaScript } from "../script/script";
import { mountMiphaAdditionalArgument, mountMiphaModules, mountMiphaRecipeLoader } from "./mount/mount";

// Public
export class MiphaMountedExecuter {

    public static fromScratch(
        script: MiphaScript,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            MiphaPermissionController.fromScratch(),
            new Set<MiphaModule>(),
            new Set<MiphaRecipe>(),
        );
    }

    public static fromModules(
        script: MiphaScript,
        permissionController: MiphaPermissionController,
        ...modules: MiphaModule[]
    ): MiphaMountedExecuter {

        return this.fromModuleSet(
            script,
            permissionController,
            new Set<MiphaModule>(modules),
        );
    }

    public static fromModuleSet(
        script: MiphaScript,
        permissionController: MiphaPermissionController,
        modules: Set<MiphaModule>,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            permissionController,
            modules,
            new Set<MiphaRecipe>(),
        );
    }

    public static fromRecipes(
        script: MiphaScript,
        permissionController: MiphaPermissionController,
        ...recipes: MiphaRecipe[]
    ): MiphaMountedExecuter {

        return this.fromRecipeSet(
            script,
            permissionController,
            new Set<MiphaRecipe>(recipes),
        );
    }

    public static fromRecipeSet(
        script: MiphaScript,
        permissionController: MiphaPermissionController,
        recipes: Set<MiphaRecipe>,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            permissionController,
            new Set<MiphaModule>(),
            recipes,
        );
    }

    public static fromModuleAndRecipeSet(
        script: MiphaScript,
        permissionController: MiphaPermissionController,
        modules: Set<MiphaModule>,
        recipes: Set<MiphaRecipe>,
    ): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);

        const recipeLoader: MiphaRecipeLoader = MiphaRecipeLoader.fromRecipeList(
            'mipha-mounted-executer',
            recipes,
        );

        mountMiphaModules(sandbox, modules);
        mountMiphaRecipeLoader(sandbox, recipeLoader);
        mountMiphaAdditionalArgument(
            sandbox,
            permissionController,
        );

        return new MiphaMountedExecuter(script, sandbox);
    }

    private readonly _script: MiphaScript;
    private readonly _sandbox: Sandbox;

    private constructor(
        script: MiphaScript,
        sandbox: Sandbox,
    ) {

        this._script = script;
        this._sandbox = sandbox;
    }

    public get sandbox(): Sandbox {
        return this._sandbox;
    }

    public async execute(): Promise<MarkedResult> {

        const scriptCode: string = this._script.scriptCode;
        const result: MarkedResult = await this._sandbox.evaluate(scriptCode);
        return result;
    }
}

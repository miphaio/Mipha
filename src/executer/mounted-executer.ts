/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { MarkedResult, Sandbox, useEverything } from "@sudoo/marked";
import { MiphaModule } from "../module/module";
import { MiphaRecipeLoader } from "../recipe/loader";
import { MiphaRecipe } from "../recipe/recipe";
import { MiphaScript } from "../script/script";
import { mountMiphaModules, mountMiphaRecipeLoader } from "./mount/mount";

// Public
export class MiphaMountedExecuter {

    public static fromScratch(
        script: MiphaScript,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            new Set<MiphaModule>(),
            new Set<MiphaRecipe>(),
        );
    }

    public static fromModules(
        script: MiphaScript,
        ...modules: MiphaModule[]
    ): MiphaMountedExecuter {

        return this.fromModuleSet(
            script,
            new Set<MiphaModule>(modules),
        );
    }

    public static fromModuleSet(
        script: MiphaScript,
        modules: Set<MiphaModule>,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            modules,
            new Set<MiphaRecipe>(),
        );
    }

    public static fromRecipes(
        script: MiphaScript,
        ...recipes: MiphaRecipe[]
    ): MiphaMountedExecuter {

        return this.fromRecipeSet(
            script,
            new Set<MiphaRecipe>(recipes),
        );
    }

    public static fromRecipeSet(
        script: MiphaScript,
        recipes: Set<MiphaRecipe>,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeSet(
            script,
            new Set<MiphaModule>(),
            recipes,
        );
    }

    public static fromModuleAndRecipeSet(
        script: MiphaScript,
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

        return new MiphaMountedExecuter(script, sandbox);
    }

    private readonly _script: MiphaScript;
    private readonly _sandbox: Sandbox;

    private constructor(script: MiphaScript, sandbox: Sandbox) {

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

/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { MarkedResult, Sandbox, useEverything } from "@sudoo/marked";
import { MiphaModule } from "../module/module";
import { MiphaRecipeLoader } from "../recipe/loader";
import { MiphaScript } from "../script/script";
import { mountMiphaModules, mountMiphaRecipeLoaders } from "./mount/mount";

// Public
export class MiphaMountedExecuter {

    public static fromScratch(
        script: MiphaScript,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            script,
            new Set<MiphaModule>(),
            new Set<MiphaRecipeLoader>(),
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

        return this.fromModuleAndRecipeLoaderSet(
            script,
            modules,
            new Set<MiphaRecipeLoader>(),
        );
    }

    public static fromRecipeLoaders(
        script: MiphaScript,
        ...recipeLoaders: MiphaRecipeLoader[]
    ): MiphaMountedExecuter {

        return this.fromRecipeLoaderSet(
            script,
            new Set<MiphaRecipeLoader>(recipeLoaders),
        );
    }

    public static fromRecipeLoaderSet(
        script: MiphaScript,
        recipeLoaders: Set<MiphaRecipeLoader>,
    ): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            script,
            new Set<MiphaModule>(),
            recipeLoaders,
        );
    }

    public static fromModuleAndRecipeLoaderSet(
        script: MiphaScript,
        modules: Set<MiphaModule>,
        recipeLoaders: Set<MiphaRecipeLoader>,
    ): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);

        mountMiphaModules(sandbox, modules);
        mountMiphaRecipeLoaders(sandbox, recipeLoaders);

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

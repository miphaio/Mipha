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

    public static fromScratch(): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            new Set<MiphaModule>(),
            new Set<MiphaRecipeLoader>(),
        );
    }

    public static fromModules(...modules: MiphaModule[]): MiphaMountedExecuter {

        return this.fromModuleSet(new Set<MiphaModule>(modules));
    }

    public static fromModuleSet(modules: Set<MiphaModule>): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            modules,
            new Set<MiphaRecipeLoader>(),
        );
    }

    public static fromRecipeLoaders(...recipeLoaders: MiphaRecipeLoader[]): MiphaMountedExecuter {

        return this.fromRecipeLoaderSet(new Set<MiphaRecipeLoader>(recipeLoaders));
    }

    public static fromRecipeLoaderSet(recipeLoaders: Set<MiphaRecipeLoader>): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            new Set<MiphaModule>(),
            recipeLoaders,
        );
    }

    public static fromModuleAndRecipeLoaderSet(
        modules: Set<MiphaModule>,
        recipeLoaders: Set<MiphaRecipeLoader>,
    ): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);

        mountMiphaModules(sandbox, modules);
        mountMiphaRecipeLoaders(sandbox, recipeLoaders);

        return new MiphaMountedExecuter(sandbox);
    }

    private readonly _sandbox: Sandbox;

    private constructor(sandbox: Sandbox) {

        this._sandbox = sandbox;
    }

    public get sandbox(): Sandbox {
        return this._sandbox;
    }

    public async execute(script: MiphaScript): Promise<MarkedResult> {

        const result: MarkedResult = await this._sandbox.evaluate(script.scriptCode);
        return result;
    }
}

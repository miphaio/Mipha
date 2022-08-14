/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { MarkedResult, Sandbox, useEverything } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
import { MiphaRecipeLoader } from "../recipe/loader";
import { mountMiphaRecipeLoaders, mountMiphaSummarizedModules } from "./mount/mount";
import { SummarizedMiphaModules, summarizeMiphaModules } from "./mount/summarize";

// Public
export class MiphaMountedExecuter {

    public static fromScratch(): MiphaMountedExecuter {

        return this.fromModuleAndRecipeLoaderSet(
            new Set<IMiphaModule>(),
            new Set<MiphaRecipeLoader>(),
        );
    }

    public static fromModules(...modules: IMiphaModule[]): MiphaMountedExecuter {

        return this.fromModuleSet(new Set<IMiphaModule>(modules));
    }

    public static fromModuleSet(modules: Set<IMiphaModule>): MiphaMountedExecuter {

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
            new Set<IMiphaModule>(),
            recipeLoaders,
        );
    }

    public static fromModuleAndRecipeLoaderSet(
        modules: Set<IMiphaModule>,
        recipeLoaders: Set<MiphaRecipeLoader>,
    ): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);

        const summarizedModules: SummarizedMiphaModules = summarizeMiphaModules(modules);
        mountMiphaSummarizedModules(sandbox, summarizedModules);
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

    public async execute(script: string): Promise<MarkedResult> {

        const result: MarkedResult = await this._sandbox.evaluate(script);
        return result;
    }
}

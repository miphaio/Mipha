/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { Sandbox } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
import { MiphaRecipeLoader } from "../recipe/loader";
import { IMiphaExecuter } from "./interface";
import { MiphaMountedExecuter } from "./mounted-executer";

// Public
export class MiphaExecuter implements IMiphaExecuter {

    public static fromModules(modules: Set<IMiphaModule>): MiphaExecuter {

        return new MiphaExecuter(modules);
    }

    public static fromScratch(): MiphaExecuter {

        const modules: Set<IMiphaModule> = new Set<IMiphaModule>();
        return new MiphaExecuter(modules);
    }

    private readonly _marked: Sandbox;

    private readonly _modules: Set<IMiphaModule>;
    private readonly _recipeLoaders: Set<MiphaRecipeLoader>;

    private constructor(modules: Set<IMiphaModule>) {

        this._marked = Sandbox.create();

        this._modules = modules;
        this._recipeLoaders = new Set<MiphaRecipeLoader>();
    }

    public get modules(): Set<IMiphaModule> {
        return this._modules;
    }

    public useModule(module: IMiphaModule): this {

        this._modules.add(module);
        return this;
    }

    public useRecipeLoader(recipeLoader: MiphaRecipeLoader): this {

        this._recipeLoaders.add(recipeLoader);
        return this;
    }

    public mount(): MiphaMountedExecuter {

        return MiphaMountedExecuter.fromModuleAndRecipeLoaderSet(
            this._modules,
            this._recipeLoaders,
        );
    }
}

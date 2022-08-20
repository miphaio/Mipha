/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { MiphaModule } from "../module/module";
import { MiphaRecipeLoader } from "../recipe/loader";
import { MiphaScript } from "../script/script";
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
    private readonly _recipeLoaders: Set<MiphaRecipeLoader>;

    private constructor(modules: Set<MiphaModule>) {

        this._modules = modules;
        this._recipeLoaders = new Set<MiphaRecipeLoader>();
    }

    public useModule(module: MiphaModule): this {

        this._modules.add(module);
        return this;
    }

    public useRecipeLoader(recipeLoader: MiphaRecipeLoader): this {

        this._recipeLoaders.add(recipeLoader);
        return this;
    }

    public mountForScript(script: MiphaScript): MiphaMountedExecuter {

        return MiphaMountedExecuter.fromModuleAndRecipeLoaderSet(
            script,
            this._modules,
            this._recipeLoaders,
        );
    }
}

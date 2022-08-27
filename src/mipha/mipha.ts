/**
 * @author WMXPY
 * @namespace Mipha
 * @description Mipha
 */

import { MarkedResult } from "@sudoo/marked";
import { MiphaExecuter } from "../executer/executer";
import { MiphaMountedExecuter } from "../executer/mounted-executer";
import { MiphaModule } from "../module/module";
import { MiphaPermission } from "../permission/permission";
import { MiphaRecipe } from "../recipe/recipe";
import { MiphaScript } from "../script/script";
import { MiphaStorageProxy } from "../storage/proxy";
import { IMipha, MiphaConstructConfig, MiphaMixin } from "./declare";
import { MiphaCoreConfigManager } from "./manager/config";
import { MiphaCoreRecipeManager } from "./manager/recipe";
import { MiphaCoreScriptManager } from "./manager/script";

// Public
export class Mipha implements IMipha {

    public static fromConfig(config: MiphaConstructConfig): Mipha {

        return new Mipha(config);
    }

    private readonly _storageProxy: MiphaStorageProxy;

    private readonly _configManager: MiphaCoreConfigManager;
    private readonly _recipeManager: MiphaCoreRecipeManager;
    private readonly _scriptManager: MiphaCoreScriptManager;

    private readonly _modules: Set<MiphaModule>;

    private constructor(config: MiphaConstructConfig) {

        this._storageProxy = config.storageProxy;

        this._configManager = MiphaCoreConfigManager.fromStorageProxy(this._storageProxy);
        this._recipeManager = MiphaCoreRecipeManager.fromStorageProxy(this._storageProxy);
        this._scriptManager = MiphaCoreScriptManager.fromStorageProxy(this._storageProxy);

        this._modules = new Set<MiphaModule>();
    }

    public get configManager(): MiphaCoreConfigManager {
        return this._configManager;
    }
    public get recipeManager(): MiphaCoreRecipeManager {
        return this._recipeManager;
    }
    public get scriptManager(): MiphaCoreScriptManager {
        return this._scriptManager;
    }

    public useMixin(mixin: MiphaMixin): this {

        mixin(this);
        return this;
    }

    public useModule(module: MiphaModule): this {

        this._modules.add(module);
        return this;
    }

    public async createExecuterByPermissions(
        permissions: Iterable<MiphaPermission>,
    ): Promise<MiphaExecuter> {

        const recipes: Iterable<MiphaRecipe> =
            await this._recipeManager.getNeededRecipesForPermissions(permissions);

        return this.createExecuterByRecipes(recipes);
    }

    public createExecuterByRecipes(
        recipes: Iterable<MiphaRecipe>,
    ): MiphaExecuter {

        return MiphaExecuter.fromModulesAndRecipes(
            this._modules,
            recipes,
        );
    }

    public async mountForScriptByPermissions(
        script: MiphaScript,
        permissions: Iterable<MiphaPermission>,
    ): Promise<MiphaMountedExecuter> {

        const executer = await this.createExecuterByPermissions(permissions);
        return executer.mountForScript(script, permissions);
    }

    public async mountAndExecuteForScriptByPermissions(
        script: MiphaScript,
        permissions: Iterable<MiphaPermission>,
    ): Promise<MarkedResult> {

        const executer = await this.createExecuterByPermissions(permissions);
        return executer.mountAndExecute(script, permissions);
    }
}

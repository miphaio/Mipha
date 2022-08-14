/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { Sandbox } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
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

    private constructor(modules: Set<IMiphaModule>) {

        this._marked = Sandbox.create();

        this._modules = modules;
    }

    public get modules(): Set<IMiphaModule> {
        return this._modules;
    }

    public use(module: IMiphaModule): this {

        this._modules.add(module);
        return this;
    }

    public mount(): MiphaMountedExecuter {

        return MiphaMountedExecuter.mount(this._modules);
    }
}

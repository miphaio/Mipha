/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { Sandbox } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
import { mountMiphaModule } from "./mount";

// Internal
export class MiphaMountedExecuter {

    public static mount(modules: Set<IMiphaModule>): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();

        for (const module of modules) {
            mountMiphaModule(sandbox, module);
        }

        return new MiphaMountedExecuter(sandbox);
    }

    private readonly _sandbox: Sandbox;

    private constructor(sandbox: Sandbox) {

        this._sandbox = sandbox;
    }

    public get sandbox(): Sandbox {
        return this._sandbox;
    }
}

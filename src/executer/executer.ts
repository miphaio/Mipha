/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 */

import { Sandbox } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
import { IMiphaExecuter } from "./interface";

// Public
export class MiphaExecuter implements IMiphaExecuter {

    public static fromScratch(): MiphaExecuter {

        return new MiphaExecuter();
    }

    private readonly _modules: Set<IMiphaModule>;
    private readonly _marked: Sandbox;

    private constructor() {

        this._modules = new Set();
        this._marked = Sandbox.create();
    }

    public get modules(): Set<IMiphaModule> {
        return this._modules;
    }
}

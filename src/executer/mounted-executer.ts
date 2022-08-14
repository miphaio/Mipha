/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 */

import { MarkedResult, Sandbox, useEverything } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";
import { mountMiphaSummarizedModules } from "./mount/mount";
import { SummarizedMiphaModules, summarizeMiphaModules } from "./mount/summarize";

// Public
export class MiphaMountedExecuter {

    public static mount(modules: Set<IMiphaModule>): MiphaMountedExecuter {

        const sandbox: Sandbox = Sandbox.create();
        useEverything(sandbox);

        const summarizedModules: SummarizedMiphaModules = summarizeMiphaModules(modules);
        mountMiphaSummarizedModules(sandbox, summarizedModules);

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

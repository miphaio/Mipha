/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mount
 */

import { Sandbox } from "@sudoo/marked";
import { SummarizedMiphaModules } from "./summarize";

// Internal
export const mountMiphaSummarizedModules = (sandbox: Sandbox, summarizedModules: SummarizedMiphaModules): void => {

    const provideKeys: string[] = Object.keys(summarizedModules.provides);
    for (const provideKey of provideKeys) {
        sandbox.provide(provideKey, summarizedModules.provides[provideKey]);
    }

    return;
};

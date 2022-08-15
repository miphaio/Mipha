/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Summarize
 */

import { MiphaModule } from "../../module/module";

// Internal
export type SummarizedMiphaModules = {

    readonly provides: Record<string, Record<string, any>>;
};

// Internal
export const summarizeMiphaModules = (modules: Set<MiphaModule>): SummarizedMiphaModules => {

    const provides: Record<string, Record<string, any>> = {};

    for (const module of modules) {
        const moduleProvides: Record<string, any> = module.provides;
        provides[module.identifier] = moduleProvides;
    }

    return {
        provides,
    };
};

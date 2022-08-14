/**
 * @author WMXPY
 * @namespace Executer
 * @description Mount
 */

import { Sandbox } from "@sudoo/marked";
import { IMiphaModule } from "../module/interface";

// Internal
export const mountMiphaModule = (sandbox: Sandbox, module: IMiphaModule): void => {

    const provides: Map<string, any> = module.provides;

    sandbox.provide(module.identifier, provides);
    return;
};

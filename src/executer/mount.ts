/**
 * @author WMXPY
 * @namespace Executer
 * @description Mount
 */

import { IMiphaModule } from "../module/interface";
import { IMiphaExecuter } from "./interface";

// Private
export const mountMiphaModule = (executer: IMiphaExecuter, module: IMiphaModule): void => {

    executer.modules.add(module);
    return;
};

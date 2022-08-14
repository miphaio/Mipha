/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Mixin
 */

import { MiphaMixinModule } from "../../module/mixin/module";
import { IMiphaExecuter } from "./../interface";

// Private
export const mountMiphaMixinModule = (executer: IMiphaExecuter, module: MiphaMixinModule): void => {

    executer.modules.add(module);
    return;
};

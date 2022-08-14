/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Script
 */

import { MiphaScriptModule } from "../../module/script/module";
import { IMiphaExecuter } from "./../interface";

// Private
export const mountMiphaScriptModule = (executer: IMiphaExecuter, module: MiphaScriptModule): void => {

    executer.modules.add(module);
    return;
};

/**
 * @author WMXPY
 * @namespace Executer
 * @description Mount
 */

import { IMiphaModule } from "../module/interface";
import { MiphaMixinModule } from "../module/mixin/module";
import { MiphaScriptModule } from "../module/script/module";
import { IMiphaExecuter } from "./interface";
import { mountMiphaMixinModule } from "./mount/mixin";
import { mountMiphaScriptModule } from "./mount/script";

// Private
export const mountMiphaModule = (executer: IMiphaExecuter, module: IMiphaModule): void => {

    if (module instanceof MiphaMixinModule) {

        mountMiphaMixinModule(executer, module);
        return;
    }

    if (module instanceof MiphaScriptModule) {

        mountMiphaScriptModule(executer, module);
        return;
    }

    return;
};

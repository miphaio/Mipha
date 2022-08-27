/**
 * @author WMXPY
 * @namespace Mipha
 * @description Declare
 */

import { MiphaModule } from "../module/module";
import { MiphaStorageProxy } from "../storage/proxy";

// Public
export type MiphaConstructConfig = {

    readonly storageProxy: MiphaStorageProxy;
};

// Public
export type MiphaMixin = (instance: IMipha) => void;

// Public
export interface IMipha {

    useMixin(mixin: MiphaMixin): IMipha;
    useModule(module: MiphaModule): IMipha;
}

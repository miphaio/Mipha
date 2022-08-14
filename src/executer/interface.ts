/**
 * @author WMXPY
 * @namespace Executer
 * @description Interface
 */

import { IMiphaModule } from "../module/interface";

// Internal
export interface IMiphaExecuter {

    readonly modules: Set<IMiphaModule>;
}

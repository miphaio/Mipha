/**
 * @author WMXPY
 * @namespace Executer
 * @description Interface
 */

import { IMiphaModule } from "../module/interface";

// Private
export interface IMiphaExecuter {

    readonly modules: Set<IMiphaModule>;
}

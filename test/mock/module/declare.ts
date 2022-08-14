/**
 * @author WMXPY
 * @namespace Module
 * @description Declare
 * @override Mock
 */

import { IMiphaModule } from "../../../src";

export type MockModule<T = undefined> = {

    readonly module: IMiphaModule;
    payload: T;
};

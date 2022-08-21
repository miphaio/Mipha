/**
 * @author WMXPY
 * @namespace Module
 * @description Declare
 * @override Mock
 */

import { MiphaModule } from "../../../src";

export type MockModule<T = undefined> = {

    readonly module: MiphaModule;
    payload: T;
};

/**
 * @author WMXPY
 * @namespace Module
 * @description Declare
 */

import { MiphaExecuterAdditionalArgument } from "../executer/additional-argument";

// Public
export type MiphaModuleProvideObject<T> =
    // eslint-disable-next-line @typescript-eslint/ban-types
    T extends Function
    ? (additionalArgument: MiphaExecuterAdditionalArgument, ...args: any[]) => any
    : T;

/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

import { Panic } from "connor";

export const MODULE_NAME = 'Mipha';

export enum ERROR_CODE {

    RESOLVER_ALREADY_MOUNTED_1 = 40850,
    RESOLVER_NOT_MOUNTED_1 = 40950,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.RESOLVER_ALREADY_MOUNTED_1]: 'Resolver for {} already mounted',
    [ERROR_CODE.RESOLVER_NOT_MOUNTED_1]: 'Resolver for {} not mounted',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

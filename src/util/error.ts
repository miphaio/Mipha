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

    LRU_CACHE_NOT_FOUND_1 = 41100,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.RESOLVER_ALREADY_MOUNTED_1]: 'Resolver for {} already mounted',
    [ERROR_CODE.RESOLVER_NOT_MOUNTED_1]: 'Resolver for {} not mounted',

    [ERROR_CODE.LRU_CACHE_NOT_FOUND_1]: 'LRU cache for {} not found',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

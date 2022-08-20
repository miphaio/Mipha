/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

import { Panic } from "connor";

// Internal
export const MODULE_NAME = 'Mipha';

// Internal
export enum ERROR_CODE {

    INVALID_MODULE_PROVIDE_DEFAULT = 400150,

    RESOLVER_ALREADY_MOUNTED_1 = 408500,
    RESOLVER_NOT_MOUNTED_1 = 409500,

    LRU_CACHE_NOT_FOUND_1 = 411000,

    FAILED_CALCULATE_COMMON_START = 500050,

    INVALID_BLOCK_DIVERSE_TYPE_1 = 501550,
}

// Internal
export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.INVALID_MODULE_PROVIDE_DEFAULT]: 'Cannot provide default, use provideDefault method instead',

    [ERROR_CODE.RESOLVER_ALREADY_MOUNTED_1]: 'Resolver for {} already mounted',
    [ERROR_CODE.RESOLVER_NOT_MOUNTED_1]: 'Resolver for {} not mounted',

    [ERROR_CODE.LRU_CACHE_NOT_FOUND_1]: 'LRU cache for {} not found',

    [ERROR_CODE.FAILED_CALCULATE_COMMON_START]: 'Failed to calculate common start',

    [ERROR_CODE.INVALID_BLOCK_DIVERSE_TYPE_1]: 'Invalid block diverse type {}',
};

// Internal
export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

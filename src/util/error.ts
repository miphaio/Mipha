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

    MODULE_IDENTIFIER_ALREADY_MOUNTED_1 = 400160,

    INVALID_ASSIGNED_PERMISSION_MODULE_FORMAT_1 = 400401,
    INVALID_ASSIGNED_PERMISSION_SCOPE_FORMAT_1 = 400402,
    INVALID_ASSIGNED_PERMISSION_RESOURCE_FORMAT_1 = 400403,

    UNCLEARED_REQUIRED_BUILDER_VALUE_1 = 400501,

    INSUFFICIENT_PERMISSION_TO_EXECUTE_1 = 403100,

    RECIPE_NOT_FOUND_1 = 404102,
    SCRIPT_NOT_FOUND_1 = 404103,

    CORRESPONDED_DEPENDENCY_NOT_FOUND_1 = 404110,

    RESOLVER_ALREADY_MOUNTED_1 = 408500,
    RESOLVER_NOT_MOUNTED_1 = 409500,

    LRU_CACHE_NOT_FOUND_1 = 411000,

    FAILED_CALCULATE_COMMON_START = 500050,

    INVALID_REQUIRED_PERMISSION_MODULE_FORMAT_1 = 500411,
    INVALID_REQUIRED_PERMISSION_SCOPE_FORMAT_1 = 500412,
    INVALID_REQUIRED_PERMISSION_RESOURCE_FORMAT_1 = 500413,

    INVALID_BLOCK_DIVERSE_TYPE_1 = 501550,
}

// Internal
export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.INVALID_MODULE_PROVIDE_DEFAULT]: 'Cannot provide default, use provideDefault method instead',

    [ERROR_CODE.MODULE_IDENTIFIER_ALREADY_MOUNTED_1]: 'Module identifier already mounted: {}',

    [ERROR_CODE.INVALID_ASSIGNED_PERMISSION_MODULE_FORMAT_1]: 'Invalid assigned permission module identifier format: {}',
    [ERROR_CODE.INVALID_ASSIGNED_PERMISSION_SCOPE_FORMAT_1]: 'Invalid assigned permission scope identifier format: {}',
    [ERROR_CODE.INVALID_ASSIGNED_PERMISSION_RESOURCE_FORMAT_1]: 'Invalid assigned permission resource identifier format: {}',

    [ERROR_CODE.UNCLEARED_REQUIRED_BUILDER_VALUE_1]: 'Uncleared required builder value: {}',

    [ERROR_CODE.INSUFFICIENT_PERMISSION_TO_EXECUTE_1]: 'Permission {} is required',

    [ERROR_CODE.RECIPE_NOT_FOUND_1]: 'Recipe not found: {}',
    [ERROR_CODE.SCRIPT_NOT_FOUND_1]: 'Script not found: {}',

    [ERROR_CODE.CORRESPONDED_DEPENDENCY_NOT_FOUND_1]: 'Corresponded dependency not found: {}',

    [ERROR_CODE.RESOLVER_ALREADY_MOUNTED_1]: 'Resolver for {} already mounted',
    [ERROR_CODE.RESOLVER_NOT_MOUNTED_1]: 'Resolver for {} not mounted',

    [ERROR_CODE.LRU_CACHE_NOT_FOUND_1]: 'LRU cache for {} not found',

    [ERROR_CODE.FAILED_CALCULATE_COMMON_START]: 'Failed to calculate common start',

    [ERROR_CODE.INVALID_REQUIRED_PERMISSION_MODULE_FORMAT_1]: 'Invalid required permission module identifier format: {}',
    [ERROR_CODE.INVALID_REQUIRED_PERMISSION_SCOPE_FORMAT_1]: 'Invalid required permission scope identifier format: {}',
    [ERROR_CODE.INVALID_REQUIRED_PERMISSION_RESOURCE_FORMAT_1]: 'Invalid required permission resource identifier format: {}',

    [ERROR_CODE.INVALID_BLOCK_DIVERSE_TYPE_1]: 'Invalid block diverse type {}',
};

// Internal
export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

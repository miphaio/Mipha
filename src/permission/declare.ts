/**
 * @author WMXPY
 * @namespace Permission
 * @description Declare
 */

// Public
export type MiphaPermissionConfig = {

    readonly identifier: string;
    readonly scopes: Iterable<MiphaPermissionScopeConfig>;
};

// Public
export type MiphaPermissionScopeConfig = {

    readonly scope: string;
    readonly resources: string[];
};

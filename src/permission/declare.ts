/**
 * @author WMXPY
 * @namespace Permission
 * @description Declare
 */

// Public
export type MiphaPermissionConfig = {

    readonly identifier: string;
    readonly scopes: MiphaPermissionScopeConfig[];
};

// Public
export type MiphaPermissionScopeConfig = {

    readonly scope: string;
    readonly resource: string;
};

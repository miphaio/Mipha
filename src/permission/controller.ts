/**
 * @author WMXPY
 * @namespace Permission
 * @description Controller
 */

import { ERROR_CODE, panic } from "../util/error";
import { MiphaPermission } from "./permission";
import { ModuleIdentifierRequiredFormatRegExp } from "./util/regular-expression";

// Public
export class MiphaPermissionController {

    public static fromScratch(): MiphaPermissionController {

        return this.fromPermissionList([]);
    }

    public static fromPermissionList(permissions: Iterable<MiphaPermission>): MiphaPermissionController {

        const permissionMap: Map<string, Set<MiphaPermission>> = new Map<string, Set<MiphaPermission>>();

        for (const permission of permissions) {

            if (permissionMap.has(permission.identifier)) {

                const permissionSet: Set<MiphaPermission> = permissionMap.get(permission.identifier) as Set<MiphaPermission>;
                permissionSet.add(permission);
            } else {

                const permissionSet: Set<MiphaPermission> = new Set<MiphaPermission>();
                permissionSet.add(permission);
                permissionMap.set(permission.identifier, permissionSet);
            }
        }
        return new MiphaPermissionController(permissionMap);
    }

    private readonly _permissions: Map<string, Set<MiphaPermission>>;

    private constructor(
        permissions: Map<string, Set<MiphaPermission>>,
    ) {

        this._permissions = permissions;
    }

    public canExecute(
        moduleIdentifier: string,
        scopeIdentifier: string,
        resourceIdentifier: string,
    ): boolean {

        if (!this._permissions.has(moduleIdentifier)) {
            return false;
        }

        const permissionSet: Set<MiphaPermission> = this._permissions.get(moduleIdentifier) as Set<MiphaPermission>;
        for (const permission of permissionSet) {
            if (permission.canExecute(scopeIdentifier, resourceIdentifier)) {
                return true;
            }
        }
        return false;
    }

    public assert(
        moduleIdentifier: string,
        scopeIdentifier: string,
        resourceIdentifier: string,
    ): void {

        if (!ModuleIdentifierRequiredFormatRegExp.test(moduleIdentifier)) {
            throw panic.code(
                ERROR_CODE.INVALID_REQUIRED_PERMISSION_MODULE_FORMAT_1,
                moduleIdentifier,
            );
        }

        if (!this.canExecute(moduleIdentifier, scopeIdentifier, resourceIdentifier)) {
            throw panic.code(
                ERROR_CODE.INSUFFICIENT_PERMISSION_TO_EXECUTE_1,
                `${moduleIdentifier}:${scopeIdentifier}:${resourceIdentifier}`,
            );
        }
        return;
    }
}

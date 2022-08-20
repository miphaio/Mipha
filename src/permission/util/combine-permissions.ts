/**
 * @author WMXPY
 * @namespace Permission_Util
 * @description Combine Permissions
 */

import { MiphaPermission } from "../permission";

// Internal
export const combineMiphaPermissions = (permissions: Set<MiphaPermission>): Set<MiphaPermission> => {

    const permissionMap: Map<string, MiphaPermission> = new Map<string, MiphaPermission>();

    for (const permission of permissions) {

        const identifier: string = permission.identifier;
        if (permissionMap.has(identifier)) {

            const existingPermission: MiphaPermission = permissionMap.get(identifier) as MiphaPermission;
            existingPermission.mergeScopes(permission.scopes);
        } else {

            permissionMap.set(identifier, permission);
        }
    }

    const result: Set<MiphaPermission> = new Set<MiphaPermission>();
    return result;
};

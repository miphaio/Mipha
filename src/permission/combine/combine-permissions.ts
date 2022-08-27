/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Permissions
 */

import { MiphaPermission } from "../permission";

// Internal
export const combinePermissions = (permissions: Iterable<MiphaPermission>): MiphaPermission[] => {

    const result: MiphaPermission[] = [];
    for (const permission of permissions) {
        result.push(permission);
    }

    return result;
};

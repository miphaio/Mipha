/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Permission
 */

import { MiphaPermission } from "../permission";

// Internal
export const combinePermission = (permissions: Iterable<MiphaPermission>): MiphaPermission[] => {

    const result: MiphaPermission[] = [];
    for (const permission of permissions) {
        result.push(permission);
    }

    return result;
};

/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Permissions
 */

import { MiphaPermission } from "../permission";
import { MiphaPermissionScope } from "../scope";
import { combineScopes } from "./combine-scopes";

// Internal
export const combinePermissions = (permissions: Iterable<MiphaPermission>): MiphaPermission[] => {

    const tempMap: Map<string, MiphaPermission> = new Map();

    for (const permission of permissions) {

        if (tempMap.has(permission.identifier)) {

            const temp: MiphaPermission =
                tempMap.get(permission.identifier) as MiphaPermission;

            const combinedScopes: MiphaPermissionScope[] = combineScopes(
                [...temp.scopes, ...permission.scopes],
            );

            temp.replaceScopes(combinedScopes);
        } else {

            tempMap.set(permission.identifier, permission.clone());
        }
    }

    return [
        ...tempMap.values(),
    ];
};

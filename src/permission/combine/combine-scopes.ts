/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Scope
 */

import { MiphaPermissionScope } from "../scope";

export const combineScopes = (scopes: MiphaPermissionScope[]): MiphaPermissionScope[] => {

    const tempMap: Map<string, MiphaPermissionScope> = new Map();

    for (const scope of scopes) {

        if (tempMap.has(scope.scope)) {

            const temp: MiphaPermissionScope =
                tempMap.get(scope.scope) as MiphaPermissionScope;

            temp.resources.push(...scope.resources);
        } else {

            tempMap.set(scope.scope, scope.clone());
        }
    }

    return [
        ...tempMap.values(),
    ];
};

/**
 * @author WMXPY
 * @namespace Permission_Combine
 * @description Combine Scope
 */

import { MiphaPermissionScope } from "../scope";

// Internal
export const combineScopes = (scopes: MiphaPermissionScope[]): MiphaPermissionScope[] => {

    const tempMap: Map<string, MiphaPermissionScope> = new Map();

    for (const scope of scopes) {

        if (tempMap.has(scope.scope)) {

            const temp: MiphaPermissionScope =
                tempMap.get(scope.scope) as MiphaPermissionScope;

            const toBeAddResources: string[] = [
                ...temp.resources,
                ...scope.resources,
            ];
            const newResources: Set<string> = new Set();

            for (const toBeAddResource of toBeAddResources) {

                const existResources: Set<string> = new Set(newResources);
                for (const existResource of existResources) {

                    const toBeAddRegExp: RegExp =
                        new RegExp(`^${toBeAddResource.replace('*', '.+')}$`);

                    if (toBeAddRegExp.test(existResource)) {

                        newResources.delete(existResource);
                        newResources.add(toBeAddResource);
                        continue;
                    }

                    const newRegExp: RegExp =
                        new RegExp(`^${existResource.replace('*', '.+')}$`);

                    if (newRegExp.test(toBeAddResource)) {
                        continue;
                    }

                    newResources.add(toBeAddResource);
                }
            }

            temp.replaceResources(newResources);
        } else {

            tempMap.set(scope.scope, scope.clone());
        }
    }

    return [
        ...tempMap.values(),
    ];
};

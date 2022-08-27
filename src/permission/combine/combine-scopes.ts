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

        if (!tempMap.has(scope.scope)) {
            tempMap.set(scope.scope, MiphaPermissionScope.fromScopeAndResources(
                scope.scope,
                [],
            ));
        }

        const temp: MiphaPermissionScope =
            tempMap.get(scope.scope) as MiphaPermissionScope;

        const toBeAddResources: string[] = [
            ...temp.resources,
            ...scope.resources,
        ];
        const newResources: Set<string> = new Set();

        outer: for (const toBeAddResource of toBeAddResources) {

            if (newResources.size === 0) {
                newResources.add(toBeAddResource);
                continue outer;
            }

            const existResources: Set<string> = new Set(newResources);
            for (const existResource of existResources) {

                const toBeAddRegExp: RegExp =
                    new RegExp(`^${toBeAddResource.replace('*', '.+')}$`);

                if (toBeAddRegExp.test(existResource)) {

                    newResources.delete(existResource);
                    newResources.add(toBeAddResource);
                    continue outer;
                }

                const existRegExp: RegExp =
                    new RegExp(`^${existResource.replace('*', '.+')}$`);

                if (existRegExp.test(toBeAddResource)) {
                    continue outer;
                }

                newResources.add(toBeAddResource);
            }
        }

        temp.replaceResources([...newResources].sort());
    }

    return [
        ...tempMap.values(),
    ];
};

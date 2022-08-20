/**
 * @author WMXPY
 * @namespace Executer_Mount
 * @description Filter Modules
 */

import { MiphaModule } from "../../module/module";
import { MiphaPermission } from "../../permission/permission";

export const filterMiphaModulesByPermissions = (
    modules: Set<MiphaModule>,
    permissions: Set<MiphaPermission>,
): Set<MiphaModule> => {

    const permissionMap: Map<string, MiphaPermission> = new Map();
    for (const permission of permissions) {
        permissionMap.set(permission.identifier, permission);
    }

    const filtered: Set<MiphaModule> = new Set();
    for (const module of modules) {
        if (permissionMap.has(module.identifier)) {
            filtered.add(module);
        }
    }
    return filtered;
};

/**
 * @author WMXPY
 * @namespace Permission
 * @description Controller
 */

import { MiphaPermission } from "./permission";

// Public
export class MiphaPermissionController {

    public static fromScratch(): MiphaPermissionController {

        return this.fromPermissionList([]);
    }

    public static fromPermissionList(permissions: Iterable<MiphaPermission>): MiphaPermissionController {

        const permissionsSet: Set<MiphaPermission> = new Set<MiphaPermission>(permissions);
        return new MiphaPermissionController(permissionsSet);
    }

    private readonly _permissions: Set<MiphaPermission>;

    private constructor(
        permissions: Set<MiphaPermission>,
    ) {

        this._permissions = permissions;
    }

    public get permissions(): Set<MiphaPermission> {
        return this._permissions;
    }
}

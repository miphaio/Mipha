/**
 * @author WMXPY
 * @namespace Executer
 * @description Additional Argument
 */

import { MiphaPermissionController } from "../permission/controller";

// Public
export class MiphaExecuterAdditionalArgument {

    public static create(
        permissionController: MiphaPermissionController,
    ): MiphaExecuterAdditionalArgument {

        return new MiphaExecuterAdditionalArgument(
            permissionController,
        );
    }

    private readonly _permissionController: MiphaPermissionController;

    private constructor(
        permissionController: MiphaPermissionController,
    ) {

        this._permissionController = permissionController;
    }

    public get permissionController(): MiphaPermissionController {
        return this._permissionController;
    }
}

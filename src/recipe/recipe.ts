/**
 * @author WMXPY
 * @namespace Recipe
 * @description Recipe
 */

import { MiphaPermission } from "../permission/permission";

// Public
export class MiphaRecipe {

    public static fromCode(
        identifier: string,
        recipeCode: string,
        requiredPermissions: MiphaPermission[],
    ): MiphaRecipe {

        return new MiphaRecipe(
            identifier,
            recipeCode,
            requiredPermissions,
        );
    }

    private readonly _recipeIdentifier: string;
    private readonly _recipeCode: string;
    private readonly _requiredPermissions: MiphaPermission[];

    private constructor(
        identifier: string,
        recipeCode: string,
        requiredPermissions: MiphaPermission[],
    ) {

        this._recipeIdentifier = identifier;
        this._recipeCode = recipeCode;
        this._requiredPermissions = requiredPermissions;
    }

    public get identifier(): string {
        return this._recipeIdentifier;
    }
    public get recipeCode(): string {
        return this._recipeCode;
    }
    public get requiredPermissions(): MiphaPermission[] {
        return this._requiredPermissions;
    }
}

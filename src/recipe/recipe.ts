/**
 * @author WMXPY
 * @namespace Recipe
 * @description Recipe
 */

import { MiphaPermission } from "../permission/permission";

// Public
export class MiphaRecipe {

    public static fromCode(identifier: string, recipeCode: string,): MiphaRecipe {

        return new MiphaRecipe(identifier, recipeCode);
    }

    private readonly _recipeIdentifier: string;
    private readonly _recipeCode: string;

    private readonly _requiredPermissions: Set<MiphaPermission>;

    private constructor(identifier: string, recipeCode: string) {

        this._recipeIdentifier = identifier;
        this._recipeCode = recipeCode;

        this._requiredPermissions = new Set<MiphaPermission>();
    }

    public get identifier(): string {
        return this._recipeIdentifier;
    }
    public get recipeCode(): string {
        return this._recipeCode;
    }

    public get requiredPermissions(): Set<MiphaPermission> {
        return this._requiredPermissions;
    }

    public addRequiredPermission(permission: MiphaPermission): this {

        this._requiredPermissions.add(permission);
        return this;
    }
}

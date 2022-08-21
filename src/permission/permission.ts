/**
 * @author WMXPY
 * @namespace Permission
 * @description Permission
 */

import { MiphaPermissionScope } from "./scope";

// Public
export class MiphaPermission {

    public static fromIdentifier(
        identifier: string,
        scopes: Iterable<MiphaPermissionScope>,
    ): MiphaPermission {

        return new MiphaPermission(identifier, scopes);
    }

    private readonly _identifier: string;
    private readonly _scopes: Set<MiphaPermissionScope>;

    private constructor(
        identifier: string,
        scopes: Iterable<MiphaPermissionScope>,
    ) {

        this._identifier = identifier;
        this._scopes = new Set<MiphaPermissionScope>(scopes);
    }

    public get identifier(): string {
        return this._identifier;
    }
    public get scopes(): Set<MiphaPermissionScope> {
        return this._scopes;
    }

    public mergeScopes(...scopes: MiphaPermissionScope[]): this {

        for (const scope of scopes) {
            this._scopes.add(scope);
        }
        return this;
    }

    public canExecute(
        scope: string,
        resource: string,
    ): boolean {

        for (const permissionScope of this._scopes) {
            if (permissionScope.canExecute(scope, resource)) {
                return true;
            }
        }
        return false;
    }
}

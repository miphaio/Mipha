/**
 * @author WMXPY
 * @namespace Permission
 * @description Scope
 */

// Public
export class MiphaPermissionScope {

    public static fromScopeAndResource(
        scope: string,
        resource: string,
    ): MiphaPermissionScope {

        return new MiphaPermissionScope(scope, resource);
    }

    private readonly _scope: string;
    private readonly _resource: string;

    private constructor(
        scope: string,
        resource: string,
    ) {

        this._scope = scope;
        this._resource = resource;
    }

    public get scope(): string {
        return this._scope;
    }
    public get resource(): string {
        return this._resource;
    }
}

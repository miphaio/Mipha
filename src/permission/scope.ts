/**
 * @author WMXPY
 * @namespace Permission
 * @description Scope
 */

import { ERROR_CODE, panic } from "../util/error";
import { MiphaPermissionScopeConfig } from "./declare";
import { ResourceIdentifierAssignedFormatRegExp, ResourceIdentifierRequiredFormatRegExp, ScopeIdentifierAssignedFormatRegExp, ScopeIdentifierRequiredFormatRegExp } from "./util/regular-expression";

// Public
export class MiphaPermissionScope {

    public static fromConfig(config: MiphaPermissionScopeConfig): MiphaPermissionScope {

        return this.fromScopeAndResource(config.scope, config.resource);
    }

    public static fromScopeAndResource(
        scope: string,
        resource: string,
    ): MiphaPermissionScope {

        if (!ScopeIdentifierAssignedFormatRegExp.test(scope)) {
            throw panic.code(
                ERROR_CODE.INVALID_ASSIGNED_PERMISSION_SCOPE_FORMAT_1,
                scope,
            );
        }

        if (!ResourceIdentifierAssignedFormatRegExp.test(resource)) {
            throw panic.code(
                ERROR_CODE.INVALID_ASSIGNED_PERMISSION_RESOURCE_FORMAT_1,
                resource,
            );
        }

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

    public canExecute(
        scope: string,
        resource: string,
    ): boolean {

        if (!ScopeIdentifierRequiredFormatRegExp.test(scope)) {
            throw panic.code(
                ERROR_CODE.INVALID_REQUIRED_PERMISSION_SCOPE_FORMAT_1,
                scope,
            );
        }

        if (!ResourceIdentifierRequiredFormatRegExp.test(resource)) {
            throw panic.code(
                ERROR_CODE.INVALID_REQUIRED_PERMISSION_RESOURCE_FORMAT_1,
                resource,
            );
        }

        const wildcardScopeRegExp = new RegExp(`^${this._scope.replace('*', '.+')}$`);
        const wildcardResourceRegExp = new RegExp(`^${this._resource.replace('*', '.+')}$`);

        return wildcardScopeRegExp.test(scope) && wildcardResourceRegExp.test(resource);
    }

    public toConfig(): MiphaPermissionScopeConfig {

        return {
            scope: this._scope,
            resource: this._resource,
        };
    }
}

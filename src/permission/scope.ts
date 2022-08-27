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

        return this.fromScopeAndResources(config.scope, config.resources);
    }

    public static fromScopeAndResources(
        scope: string,
        resources: string[],
    ): MiphaPermissionScope {

        if (!ScopeIdentifierAssignedFormatRegExp.test(scope)) {
            throw panic.code(
                ERROR_CODE.INVALID_ASSIGNED_PERMISSION_SCOPE_FORMAT_1,
                scope,
            );
        }

        for (const resource of resources) {
            if (!ResourceIdentifierAssignedFormatRegExp.test(resource)) {
                throw panic.code(
                    ERROR_CODE.INVALID_ASSIGNED_PERMISSION_RESOURCE_FORMAT_1,
                    resource,
                );
            }
        }

        return new MiphaPermissionScope(scope, resources);
    }

    private readonly _scope: string;
    private readonly _resources: string[];

    private constructor(
        scope: string,
        resources: string[],
    ) {

        this._scope = scope;
        this._resources = resources;
    }

    public get scope(): string {
        return this._scope;
    }
    public get resources(): string[] {
        return this._resources;
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

        const wildcardScopeRegExp =
            new RegExp(`^${this._scope.replace('*', '.+')}$`);

        if (!wildcardScopeRegExp.test(scope)) {
            return false;
        }

        for (const each of this._resources) {

            const wildcardResourceRegExp: RegExp =
                new RegExp(`^${each.replace('*', '.+')}$`);

            if (wildcardResourceRegExp.test(resource)) {
                return true;
            }
        }
        return false;
    }

    public toConfig(): MiphaPermissionScopeConfig {

        return {
            scope: this._scope,
            resources: this._resources,
        };
    }

    public clone(): MiphaPermissionScope {

        return new MiphaPermissionScope(
            this._scope,
            [...this._resources],
        );
    }
}

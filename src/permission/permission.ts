/**
 * @author WMXPY
 * @namespace Permission
 * @description Permission
 */

import { ERROR_CODE, panic } from "../util/error";
import { MiphaPermissionConfig, MiphaPermissionScopeConfig } from "./declare";
import { MiphaPermissionScope } from "./scope";
import { ModuleIdentifierAssignedFormatRegExp } from "./util/regular-expression";

// Public
export class MiphaPermission {

    public static fromConfig(config: MiphaPermissionConfig): MiphaPermission {

        const scopes: MiphaPermissionScope[] = [];
        for (const scope of config.scopes) {
            scopes.push(MiphaPermissionScope.fromConfig(scope));
        }

        return this.fromIdentifier(config.identifier, scopes);
    }

    public static fromIdentifier(
        identifier: string,
        scopes: Iterable<MiphaPermissionScope>,
    ): MiphaPermission {

        if (!ModuleIdentifierAssignedFormatRegExp.test(identifier)) {
            throw panic.code(
                ERROR_CODE.INVALID_ASSIGNED_PERMISSION_MODULE_FORMAT_1,
                identifier,
            );
        }

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

    public replaceScopes(scopes: Iterable<MiphaPermissionScope>): this {

        this._scopes.clear();
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

    public toConfig(): MiphaPermissionConfig {

        const scopes: MiphaPermissionScopeConfig[] = [];
        for (const scope of this._scopes) {
            scopes.push(scope.toConfig());
        }

        return {
            identifier: this._identifier,
            scopes,
        };
    }

    public clone(): MiphaPermission {

        const scopes: MiphaPermissionScope[] = [];
        for (const scope of this._scopes) {
            scopes.push(scope.clone());
        }

        return new MiphaPermission(this._identifier, scopes);
    }
}

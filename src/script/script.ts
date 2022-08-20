/**
 * @author WMXPY
 * @namespace Script
 * @description Script
 */

import { MiphaPermission } from "../permission/permission";

// Public
export class MiphaScript {

    public static fromCode(scriptCode: string): MiphaScript {

        return new MiphaScript(scriptCode);
    }

    private readonly _scriptCode: string;

    private readonly _permissions: Set<MiphaPermission>;

    private constructor(scriptCode: string) {

        this._scriptCode = scriptCode;

        this._permissions = new Set<MiphaPermission>();
    }

    public get scriptCode(): string {
        return this._scriptCode;
    }
    public get permissions(): Set<MiphaPermission> {
        return this._permissions;
    }

    public addPermission(permission: MiphaPermission): this {

        this._permissions.add(permission);
        return this;
    }
}

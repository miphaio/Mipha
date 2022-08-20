/**
 * @author WMXPY
 * @namespace Permission
 * @description Permission
 */

// Public
export class MiphaPermission {

    public static fromIdentifier(identifier: string, scope: string[]): MiphaPermission {

        return new MiphaPermission(identifier, scope);
    }

    private readonly _identifier: string;
    private readonly _scope: Set<string>;

    private constructor(identifier: string, scope: string[]) {

        this._identifier = identifier;
        this._scope = new Set<string>(scope);
    }

    public get identifier(): string {
        return this._identifier;
    }
}

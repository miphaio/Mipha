/**
 * @author WMXPY
 * @namespace Permission
 * @description Permission
 */

// Public
export class MiphaPermission {

    public static fromIdentifier(
        identifier: string,
        scopes: Iterable<string>,
    ): MiphaPermission {

        return new MiphaPermission(identifier, scopes);
    }

    private readonly _identifier: string;
    private readonly _scopes: Set<string>;

    private constructor(
        identifier: string,
        scopes: Iterable<string>,
    ) {

        this._identifier = identifier;
        this._scopes = new Set<string>(scopes);
    }

    public get identifier(): string {
        return this._identifier;
    }
    public get scopes(): Set<string> {
        return this._scopes;
    }

    public mergeScopes(scopes: Iterable<string>): this {

        for (const scope of scopes) {
            this._scopes.add(scope);
        }
        return this;
    }
}

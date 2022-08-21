/**
 * @author WMXPY
 * @namespace Script
 * @description Script
 */

// Public
export class MiphaScript {

    public static fromCode(
        scriptCode: string,
        requirements: string[] = [],
    ): MiphaScript {

        return new MiphaScript(scriptCode, requirements);
    }

    private readonly _scriptCode: string;

    private readonly _requirements: Set<string>;

    private constructor(
        scriptCode: string,
        requirements: string[],
    ) {

        this._scriptCode = scriptCode;

        this._requirements = new Set<string>(requirements);
    }

    public get scriptCode(): string {
        return this._scriptCode;
    }

    public get requirements(): Set<string> {
        return this._requirements;
    }
}

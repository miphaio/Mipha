/**
 * @author WMXPY
 * @namespace Script
 * @description Script
 */

// Public
export class MiphaScript {

    public static fromScratch(): MiphaScript {

        return this.fromCode('');
    }

    public static fromCode(scriptCode: string): MiphaScript {

        return new MiphaScript(scriptCode);
    }

    private _scriptCode: string;

    private constructor(scriptCode: string) {

        this._scriptCode = scriptCode;
    }

    public get scriptCode(): string {
        return this._scriptCode;
    }
}

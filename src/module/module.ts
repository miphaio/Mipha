/**
 * @author WMXPY
 * @namespace Module
 * @description Module
 */

import { IMiphaModule } from "./interface";

// Public
export class MiphaModule implements IMiphaModule {

    public static fromScratch(): MiphaModule {

        return new MiphaModule('');
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

/**
 * @author WMXPY
 * @namespace Module
 * @description Base
 */

import { IMiphaModule } from "./interface";

// Public
export abstract class MiphaModuleBase implements IMiphaModule {

    private readonly _identifier: string;

    protected constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

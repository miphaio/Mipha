/**
 * @author WMXPY
 * @namespace Module
 * @description Module
 */

import { IMiphaModule } from "./interface";

// Public
export class MiphaModule implements IMiphaModule {

    public static fromScratch(identifier: string): MiphaModule {

        return new MiphaModule(identifier);
    }

    private readonly _identifier: string;

    private readonly _provides: Map<string, any>;

    private constructor(identifier: string) {

        this._identifier = identifier;

        this._provides = new Map<string, any>();
    }

    public get identifier(): string {
        return this._identifier;
    }
    public get provides(): Map<string, any> {
        return this._provides;
    }

    public provide<T>(symbol: string, object: T): this {

        this._provides.set(symbol, object);
        return this;
    }
}
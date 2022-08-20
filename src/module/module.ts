/**
 * @author WMXPY
 * @namespace Module
 * @description Module
 */

import { ERROR_CODE, panic } from "../util/error";

// Public
export class MiphaModule {

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

    public get provides(): Record<string, any> {

        const result: Record<string, any> = {};
        for (const [key, value] of this._provides) {
            result[key] = value;
        }
        return result;
    }

    public provide<T>(symbol: string, object: T): this {

        if (symbol === 'default') {
            throw panic.code(ERROR_CODE.INVALID_MODULE_PROVIDE_DEFAULT);
        }

        this._provides.set(symbol, object);
        return this;
    }

    public provideDefault<T>(object: T): this {

        this._provides.set('default', object);
        return this;
    }
}

/**
 * @author WMXPY
 * @namespace Principle
 * @description Principle
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaPrinciple {

    public static fromScratch(): MiphaPrinciple {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaPrinciple(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

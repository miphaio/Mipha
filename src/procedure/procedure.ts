/**
 * @author WMXPY
 * @namespace Procedure
 * @description Procedure
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaProcedure {

    public static fromScratch(): MiphaProcedure {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaProcedure(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

/**
 * @author WMXPY
 * @namespace Edge
 * @description Edge
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaEdge {

    public static fromScratch(): MiphaEdge {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaEdge(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

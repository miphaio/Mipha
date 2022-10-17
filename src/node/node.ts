/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 */

import { UUIDVersion4 } from "@sudoo/uuid";

export class MiphaNode {

    public static fromScratch(): MiphaNode {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaNode(identifier);
    }

    private readonly _identifier: string;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

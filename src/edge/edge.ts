/**
 * @author WMXPY
 * @namespace Edge
 * @description Edge
 */

import { UUIDVersion4 } from "@sudoo/uuid";
import { MIPHA_EDGE_RELATION } from "./relation/relation";

export class MiphaEdge {

    public static fromScratch(): MiphaEdge {

        const identifier: string = UUIDVersion4.generateString();

        return new MiphaEdge(identifier);
    }

    private readonly _identifier: string;

    private readonly _source: string;
    private readonly _target: string;

    private readonly _relation: MIPHA_EDGE_RELATION;

    private constructor(identifier: string) {

        this._identifier = identifier;
    }

    public get identifier(): string {
        return this._identifier;
    }
}

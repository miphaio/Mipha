/**
 * @author WMXPY
 * @namespace Edge
 * @description Declare
 */

import { MIPHA_RELATION } from "../relation/relation";

export type MiphaEdgeSerialized<Relation extends MIPHA_RELATION> = {

    readonly identifier: string;

    readonly source: string;
    readonly target: string;

    readonly relation: Relation;
};

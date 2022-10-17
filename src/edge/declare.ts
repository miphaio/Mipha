/**
 * @author WMXPY
 * @namespace Edge
 * @description Declare
 */

import { MIPHA_RELATION } from "../relation/relation";

export type MiphaEdgeSerialized = {

    readonly identifier: string;

    readonly source: string;
    readonly target: string;

    readonly relation: MIPHA_RELATION;
    readonly payload: string;
};

/**
 * @author WMXPY
 * @namespace Edge
 * @description Edge
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaEdge } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaEdge} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('edge-edge');

    it('should be able to construct from scratch', (): void => {

        const edge: MiphaEdge = MiphaEdge.fromScratch();

        expect(edge).to.be.instanceOf(MiphaEdge);
        expectIsUUID(edge.identifier);
    });
});

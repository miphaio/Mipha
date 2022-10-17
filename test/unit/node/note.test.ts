/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaNode } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaNode} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('node-node');

    it('should be able to construct from scratch', (): void => {

        const node: MiphaNode = MiphaNode.fromScratch();

        expect(node).to.be.instanceOf(MiphaNode);
        expectIsUUID(node.identifier);
    });
});

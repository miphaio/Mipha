/**
 * @author WMXPY
 * @namespace Principle
 * @description Principle
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaPrinciple } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaPrinciple} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('principle-principle');

    it('should be able to construct from scratch', (): void => {

        const principle: MiphaPrinciple = MiphaPrinciple.fromScratch();

        expect(principle).to.be.instanceOf(MiphaPrinciple);
        expectIsUUID(principle.identifier);
    });
});

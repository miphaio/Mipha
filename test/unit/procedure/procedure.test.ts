/**
 * @author WMXPY
 * @namespace Procedure
 * @description Procedure
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { MiphaProcedure } from '../../../src';
import { expectIsUUID } from '../../util/uuid';

describe('Given {MiphaProcedure} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('procedure-procedure');

    it('should be able to construct from scratch', (): void => {

        const procedure: MiphaProcedure = MiphaProcedure.fromScratch();

        expect(procedure).to.be.instanceOf(MiphaProcedure);
        expectIsUUID(procedure.identifier);
    });
});

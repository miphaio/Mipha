/**
 * @author WMXPY
 * @namespace Mipha
 * @description Placeholder
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';

describe('Given Placeholder', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('Placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});

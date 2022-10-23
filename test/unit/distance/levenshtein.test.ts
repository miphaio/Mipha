/**
 * @author WMXPY
 * @namespace Distance
 * @description Levenshtein
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { levenshteinDistance } from '../../../src/distance/levenshtein';

describe('Given [Levenshtein] Distance Helper Methods', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('distance-levenshtein');

    it('should be able to calculate distance for empty string', (): void => {

        const original: string = '';
        const target: string = '';

        const distance: number = levenshteinDistance(original, target);

        expect(distance).to.be.equal(0);
    });
});

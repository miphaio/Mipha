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

    it('should be able to calculate distance for same string', (): void => {

        const original: string = 'hello world';
        const target: string = 'hello world';

        const distance: number = levenshteinDistance(original, target);

        expect(distance).to.be.equal(0);
    });

    it('should be able to calculate distance for string with difference size', (): void => {

        const original: string = 'hello';
        const target: string = 'hello world!';

        const distance: number = levenshteinDistance(original, target);

        expect(distance).to.be.equal(7);
    });

    it('should be able to calculate distance for string with difference size due to center missing', (): void => {

        const original: string = 'hello beautiful world';
        const target: string = 'hello world!';

        const distance: number = levenshteinDistance(original, target);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(distance).to.be.equal(11);
    });

    it('should be able to calculate distance for string with very difference string', (): void => {

        const original: string = 'hello world';
        const target: string = 'star wars';

        const distance: number = levenshteinDistance(original, target);

        expect(distance).to.be.equal(8);
    });
});

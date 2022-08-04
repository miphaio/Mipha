/**
 * @author WMXPY
 * @namespace Engine_SearchEngine
 * @description SearchEngine
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaSearchEngine } from "../../../../src";
import { MockSearchEngine } from "../../../mock/search-engine/mock-search-engine";

describe('Given {MiphaSearchEngine} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('storage-engine-search-engine');

    it('should be able to construct', async (): Promise<void> => {

        const searchEngine: MockSearchEngine = new MockSearchEngine();

        expect(searchEngine).to.be.instanceOf(MiphaSearchEngine);
    });
});

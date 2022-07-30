/**
 * @author WMXPY
 * @namespace Cache
 * @description LRU Cache
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaLRUCache } from "../../../src/cache/lru-cache";

describe('Given {MiphaLRUCache} Class', (): void => {

    const chance: Chance.Chance = new Chance('cache-lru-cache');

    it('should be able to store cache items', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(3);

        cache.put(first, first);
        cache.put(second, second);
        cache.put(third, third);

        expect(cache.getOrNull(first)).to.be.equal(first);
        expect(cache.getOrNull(second)).to.be.equal(second);
        expect(cache.getOrNull(third)).to.be.equal(third);
    });

    it('should be able to override items in order', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();
        const forth: string = chance.string();
        const fifth: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(3);

        cache.put(first, first);
        cache.put(second, second);
        cache.put(third, third);

        cache.put(forth, forth);
        cache.put(fifth, fifth);

        expect(cache.getOrNull(first)).to.be.null;
        expect(cache.getOrNull(second)).to.be.null;
        expect(cache.getOrNull(third)).to.be.equal(third);
        expect(cache.getOrNull(forth)).to.be.equal(forth);
        expect(cache.getOrNull(fifth)).to.be.equal(fifth);
    });

    it('should be able to revisit to change order', async (): Promise<void> => {


        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();
        const forth: string = chance.string();
        const fifth: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(3);

        cache.put(first, first);
        cache.put(second, second);
        cache.put(third, third);

        cache.getOrEmpty(first);

        cache.put(forth, forth);
        cache.put(fifth, fifth);

        expect(cache.getOrNull(first)).to.be.equal(first);
        expect(cache.getOrNull(second)).to.be.null;
        expect(cache.getOrNull(third)).to.be.null;
        expect(cache.getOrNull(forth)).to.be.equal(forth);
        expect(cache.getOrNull(fifth)).to.be.equal(fifth);
    });

    it('should be able to delete items', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(3);

        cache.put(first, first);
        cache.put(second, second);
        cache.put(third, third);

        cache.delete(first);
        cache.delete(second);

        expect(cache.getOrNull(first)).to.be.null;
        expect(cache.getOrNull(second)).to.be.null;
        expect(cache.getOrNull(third)).to.be.equal(third);
    });
});

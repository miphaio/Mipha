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

        cache.getOrEmptySymbol(first);

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

    it('should be able to find existence of items', async (): Promise<void> => {

        const first: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.has(first)).to.be.true;
    });

    it('should be able to execute get item or null', async (): Promise<void> => {

        const first: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.getOrNull(first)).to.be.equal(first);
        expect(cache.getOrNull(chance.string())).to.be.null;
    });

    it('should be able to execute get item or undefined', async (): Promise<void> => {

        const first: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.getOrUndefined(first)).to.be.equal(first);
        expect(cache.getOrUndefined(chance.string())).to.be.undefined;
    });

    it('should be able to execute get item or throw', async (): Promise<void> => {

        const first: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.getOrThrow(first)).to.be.equal(first);

        expect(() => {
            cache.getOrThrow(chance.string());
        }).to.be.throw;
    });

    it('should be able to execute get item or default', async (): Promise<void> => {

        const first: string = chance.string();
        const defaultValue: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.getOrDefault(first, defaultValue)).to.be.equal(first);
        expect(cache.getOrDefault(chance.string(), defaultValue)).to.be.equal(defaultValue);
    });

    it('should be able to execute get item or empty symbol', async (): Promise<void> => {

        const first: string = chance.string();

        const cache: MiphaLRUCache<string> = MiphaLRUCache.create(1);

        cache.put(first, first);

        expect(cache.getOrEmptySymbol(first)).to.be.equal(first);
        expect(cache.getOrEmptySymbol(chance.string())).to.be.equal(MiphaLRUCache.EmptySymbol);
    });
});

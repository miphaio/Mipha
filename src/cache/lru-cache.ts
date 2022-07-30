/**
 * @author WMXPY
 * @namespace Cache
 * @description LRU Cache
 */

import { ERROR_CODE, panic } from "../util/error";

export const MiphaLRUCacheEmptySymbol = Symbol('MiphaLRUCacheEmpty');

export class MiphaLRUCache<T> {

    public static create<T>(maxSize: number): MiphaLRUCache<T> {

        return new MiphaLRUCache<T>(maxSize);
    }

    private readonly _maxSize: number;
    private readonly _map: Map<string, T>;

    private constructor(maxSize: number) {

        this._maxSize = maxSize;
        this._map = new Map<string, T>();
    }

    public get size(): number {
        return this._map.size;
    }

    public getOrNull(key: string): T | null {

        const result: T | typeof MiphaLRUCacheEmptySymbol = this.getOrEmpty(key);
        if (result === MiphaLRUCacheEmptySymbol) {
            return null;
        }
        return result;
    }

    public getOrUndefined(key: string): T | undefined {

        const result: T | typeof MiphaLRUCacheEmptySymbol = this.getOrEmpty(key);
        if (result === MiphaLRUCacheEmptySymbol) {
            return undefined;
        }
        return result;
    }

    public getOrThrow(key: string): T {

        const result: T | typeof MiphaLRUCacheEmptySymbol = this.getOrEmpty(key);
        if (result === MiphaLRUCacheEmptySymbol) {
            throw panic.code(ERROR_CODE.LRU_CACHE_NOT_FOUND_1, key);
        }
        return result;
    }

    public getOrDefault(key: string, defaultValue: T): T {

        const result: T | typeof MiphaLRUCacheEmptySymbol = this.getOrEmpty(key);
        if (result === MiphaLRUCacheEmptySymbol) {
            return defaultValue;
        }
        return result;
    }

    public getOrEmpty(key: string): T | typeof MiphaLRUCacheEmptySymbol {

        if (!this._map.has(key)) {
            return MiphaLRUCacheEmptySymbol;
        }

        const result: T = this._map.get(key)!;
        this._map.delete(key);
        this._map.set(key, result);
        return result;
    }

    public put(key: string, value: T): this {

        if (this._map.size >= this._maxSize) {

            const first: string = this._map.keys().next().value;
            this._map.delete(first);
        }

        this._map.set(key, value);
        return this;
    }

    public has(key: string): boolean {

        return this._map.has(key);
    }

    public delete(key: string): this {

        this._map.delete(key);
        return this;
    }
}

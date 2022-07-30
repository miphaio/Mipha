/**
 * @author WMXPY
 * @namespace Cache
 * @description LRU Cache
 */

import { MiphaDoubleLinkedNode } from "./double-linked-node";

export class MiphaLRUCache<T> {

    public static create<T>(maxSize: number): MiphaLRUCache<T> {

        return new MiphaLRUCache<T>(maxSize);
    }

    private readonly _maxSize: number;
    private readonly _map: Map<string, MiphaDoubleLinkedNode<T>>;

    private _head: MiphaDoubleLinkedNode<T> | null;
    private _tail: MiphaDoubleLinkedNode<T> | null;

    private _size: number;

    private constructor(maxSize: number) {

        this._maxSize = maxSize;
        this._map = new Map<string, MiphaDoubleLinkedNode<T>>();

        this._head = null;
        this._tail = null;

        this._size = 0;
    }
}

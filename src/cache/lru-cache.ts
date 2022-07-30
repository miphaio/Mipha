/**
 * @author WMXPY
 * @namespace Cache
 * @description LRU Cache
 */

import { MiphaDoubleLinkedNode, MiphaDoubleLinkedNodeEmptySymbol } from "./double-linked-node";

export class MiphaLRUCache<T> {

    public static create<T>(maxSize: number): MiphaLRUCache<T> {

        return new MiphaLRUCache<T>(maxSize);
    }

    private readonly _maxSize: number;
    private readonly _map: Map<string, MiphaDoubleLinkedNode<T>>;

    private readonly _head: MiphaDoubleLinkedNode<T>;
    private readonly _tail: MiphaDoubleLinkedNode<T>;

    private constructor(maxSize: number) {

        this._maxSize = maxSize;
        this._map = new Map<string, MiphaDoubleLinkedNode<T>>();

        this._head = MiphaDoubleLinkedNode.createEmpty();
        this._tail = MiphaDoubleLinkedNode.createEmpty();
    }

    public get(key: string): T | null {

        if (!this._map.has(key)) {
            return null;
        }

        const node: MiphaDoubleLinkedNode<T> = this._map.get(key)!;

        if (node.value === MiphaDoubleLinkedNodeEmptySymbol) {
            return null;
        }

        node.previous?.setNext(node.next);
        node.next?.setPrevious(node.previous);

        this._tail.previous?.setNext(node);
        node.setPrevious(this._tail?.previous);
        node.setNext(this._tail);
        this._tail.setPrevious(node);

        return node.value;
    }

    public put(key: string, value: T): this {

        if (this.get(key) !== null) {
            return this;
        }

        if (this._map.size >= this._maxSize) {

            this._map.delete(this._head.next!.key);
            this._head.setNext(this._head.next!.next);
            this._head.next!.setPrevious(this._head);
        }

        const newNode: MiphaDoubleLinkedNode<T> = MiphaDoubleLinkedNode.create(key, value);

        this._map.set(key, newNode);
        this._tail.previous?.setNext(newNode);
        newNode.setPrevious(this._tail.previous);
        newNode.setNext(this._tail);
        this._tail.setPrevious(newNode);

        return this;
    }
}

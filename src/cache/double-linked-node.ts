/**
 * @author WMXPY
 * @namespace Cache
 * @description Double Linked Node
 */

export class MiphaDoubleLinkedNode<T> {

    public static create<T>(value: T): MiphaDoubleLinkedNode<T> {

        return new MiphaDoubleLinkedNode<T>(value);
    }

    private readonly _value: T;

    private _prev: MiphaDoubleLinkedNode<T> | null;
    private _next: MiphaDoubleLinkedNode<T> | null;

    private constructor(value: T) {

        this._value = value;

        this._prev = null;
        this._next = null;
    }

    public get value(): T {
        return this._value;
    }

    public get prev(): MiphaDoubleLinkedNode<T> | null {
        return this._prev;
    }

    public get next(): MiphaDoubleLinkedNode<T> | null {
        return this._next;
    }

    public set prev(node: MiphaDoubleLinkedNode<T> | null) {
        this._prev = node;
    }

    public set next(node: MiphaDoubleLinkedNode<T> | null) {
        this._next = node;
    }
}

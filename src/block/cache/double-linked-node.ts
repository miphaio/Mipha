/**
 * @author WMXPY
 * @namespace Block_Cache
 * @description Double Linked Node
 */

const MiphaDoubleLinkedNodeEmptyKeySymbol = Symbol('MiphaDoubleLinkedNodeEmptyKeySymbol');
// Internal
export const MiphaDoubleLinkedNodeEmptySymbol = Symbol('MiphaDoubleLinkedNodeEmpty');

// Internal
export class MiphaDoubleLinkedNode<T> {

    public static create<T>(key: string, value: T): MiphaDoubleLinkedNode<T> {

        return new MiphaDoubleLinkedNode<T>(key, value);
    }

    public static createEmpty<T>(): MiphaDoubleLinkedNode<T> {

        return new MiphaDoubleLinkedNode<T>(
            MiphaDoubleLinkedNodeEmptyKeySymbol as any,
            MiphaDoubleLinkedNodeEmptySymbol,
        );
    }

    private readonly _key: string;
    private readonly _value: T | typeof MiphaDoubleLinkedNodeEmptySymbol;

    private _previous: MiphaDoubleLinkedNode<T> | null;
    private _next: MiphaDoubleLinkedNode<T> | null;

    private constructor(
        key: string,
        value: T | typeof MiphaDoubleLinkedNodeEmptySymbol,
    ) {

        this._key = key;
        this._value = value;

        this._previous = null;
        this._next = null;
    }

    public get key(): string {
        return this._key;
    }

    public get value(): T | typeof MiphaDoubleLinkedNodeEmptySymbol {
        return this._value;
    }

    public get previous(): MiphaDoubleLinkedNode<T> | null {
        return this._previous;
    }

    public get next(): MiphaDoubleLinkedNode<T> | null {
        return this._next;
    }

    public setPrevious(node: MiphaDoubleLinkedNode<T> | null): this {
        this._previous = node;
        return this;
    }

    public setNext(node: MiphaDoubleLinkedNode<T> | null): this {
        this._next = node;
        return this;
    }
}

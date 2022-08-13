/**
 * @author WMXPY
 * @namespace Block_Cache
 * @description Double Linked Node
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaDoubleLinkedNode } from "../../../../src/block/cache/double-linked-node";

describe('Given {MiphaDoubleLinkedNode} Class', (): void => {

    const chance: Chance.Chance = new Chance('cache-double-linked-node');

    it('should be able to create empty node', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const node: MiphaDoubleLinkedNode<string> = MiphaDoubleLinkedNode.create(key, value);

        expect(node.key).to.be.equal(key);
        expect(node.value).to.be.equal(value);
    });

    it('should be able to create node with previous', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const previous: MiphaDoubleLinkedNode<string> = MiphaDoubleLinkedNode.create(chance.string(), chance.string());

        const node: MiphaDoubleLinkedNode<string> = MiphaDoubleLinkedNode.create(key, value);
        node.setPrevious(previous);

        expect(node.key).to.be.equal(key);
        expect(node.value).to.be.equal(value);

        expect(node.previous).to.be.equal(previous);
    });

    it('should be able to create node with next', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const next: MiphaDoubleLinkedNode<string> = MiphaDoubleLinkedNode.create(chance.string(), chance.string());

        const node: MiphaDoubleLinkedNode<string> = MiphaDoubleLinkedNode.create(key, value);
        node.setNext(next);

        expect(node.key).to.be.equal(key);
        expect(node.value).to.be.equal(value);

        expect(node.next).to.be.equal(next);
    });
});

/**
 * @author WMXPY
 * @namespace StorageEngine
 * @description StorageEngine
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { createPreciseMiphaMarkdownBlock, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src";
import { MockStorageEngine } from "../../mock/storage-engine/mock-storage-engine";

describe('Given {MiphaStorageEngine} Class', (): void => {

    const chance: Chance.Chance = new Chance('storage-engine-storage-engine');

    it('should be able to save block', async (): Promise<void> => {

        const storageEngine: MockStorageEngine = new MockStorageEngine();

        const identifier: string = chance.string();
        const content: string = chance.string();

        await storageEngine.saveBlock(
            createPreciseMiphaMarkdownBlock(identifier, content),
        );

        expect(storageEngine.blocks).to.be.deep.equal({
            [identifier]: {
                identifier,
                type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
                content,
            },
        });
    });
});

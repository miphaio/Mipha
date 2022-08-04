/**
 * @author WMXPY
 * @namespace Engine_StorageEngine
 * @description StorageEngine
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse, MiphaDataSource, MiphaStorageEngine, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../../src";
import { hashString } from "../../../../src/util/hash";
import { MockStorageEngine } from "../../../mock/storage-engine/mock-storage-engine";

describe('Given {MiphaStorageEngine} Class', (): void => {

    const chance: Chance.Chance = new Chance('storage-engine-storage-engine');

    const dataSource: MiphaDataSource = MiphaDataSource.fromScratch();

    it('should be able to construct', async (): Promise<void> => {

        const searchEngine: MockStorageEngine = new MockStorageEngine();

        expect(searchEngine).to.be.instanceOf(MiphaStorageEngine);
    });

    it('should be able to save block', async (): Promise<void> => {

        const storageEngine: MockStorageEngine = new MockStorageEngine();

        const identifier: string = chance.string();
        const content: string = chance.string();

        await storageEngine.saveBlock(
            MiphaBlockDiverse.markdownHelper.createPrecise(
                dataSource,
                identifier, {
                content,
            }),
        );

        const hashedContent: string = hashString(content);

        expect(storageEngine.blocks).to.be.deep.equal({
            [identifier]: {
                identifier,
                dataSourceIdentifier: dataSource.identifier,
                histories: [hashedContent],
                type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
                content,
            },
        });
    });
});

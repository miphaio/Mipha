/**
 * @author WMXPY
 * @namespace Block_Engine_StorageEngine
 * @description Mock Storage Engine
 * @override Mock
 */

import { MiphaBlock, MiphaStorageEngine, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src/block/export";

export class MockStorageEngine extends MiphaStorageEngine {

    public readonly blocks: Record<string, MiphaBlock<any>> = {};

    public constructor() {
        super();
    }

    public async loadBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE = MIPHA_BLOCK_DIVERSE_TYPE>(identifier: string): Promise<MiphaBlock<Type>> {

        if (this.blocks[identifier]) {
            return this.blocks[identifier] as MiphaBlock<Type>;
        }
        throw new Error(`Block ${identifier} not found.`);
    }

    public async saveBlock(block: MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE>): Promise<void> {

        this.blocks[block.identifier] = block;
    }

    public async deleteBlock(identifier: string): Promise<void> {

        delete this.blocks[identifier];
    }
}

/**
 * @author WMXPY
 * @namespace Data_Storage
 * @description Storage Manager
 */

import { MiphaStorageEngine } from "../../engine/storage/storage-engine";
import { MiphaBlock, MIPHA_BLOCK_DIVERSE_TYPE } from "../../structure/export";
import { StorageManagerSaveBlockResponse } from "./declare";

// Public
export class MiphaStorageManager {

    public static fromScratch(): MiphaStorageManager {

        return new MiphaStorageManager();
    }

    private readonly _engines: Set<MiphaStorageEngine>;

    private constructor() {

        this._engines = new Set();
    }

    public addEngine(engine: MiphaStorageEngine): this {

        this._engines.add(engine);
        return this;
    }

    private async _saveBlock<T extends MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE>>(
        block: T,
    ): Promise<StorageManagerSaveBlockResponse> {

        for (const engine of this._engines) {
            await engine.saveBlock(block);
        }

        return {

            succeed: true,
        };
    }
}

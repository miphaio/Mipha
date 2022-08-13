/**
 * @author WMXPY
 * @namespace Block_Data_Storage
 * @description Storage
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaStorageManager } from "../../../../../src/block/export";

describe('Given {MiphaStorageManager} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('data-storage-manager');

    it('should be able to construct', async (): Promise<void> => {

        const manager: MiphaStorageManager = MiphaStorageManager.fromScratch();

        expect(manager).to.be.instanceOf(MiphaStorageManager);
    });
});

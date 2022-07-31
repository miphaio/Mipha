/**
 * @author WMXPY
 * @namespace Data
 * @description Storage Manager
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaStorageManager } from "../../../src";

describe('Given {MiphaStorageManager} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('data-storage-manager');

    it('should be able to construct', async (): Promise<void> => {

        const manager: MiphaStorageManager = MiphaStorageManager.create();

        expect(manager).to.be.instanceOf(MiphaStorageManager);
    });
});

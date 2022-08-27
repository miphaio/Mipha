/**
 * @author WMXPY
 * @namespace Mipha
 * @description Mipha
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Mipha } from "../../../src";

describe('Given {Mipha} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('mipha');

    it('should be able to construct', async (): Promise<void> => {

        const mipha: Mipha = Mipha.fromConfig({
            storageProxy: null as any,
        });

        expect(mipha).to.be.instanceOf(Mipha);
    });
});

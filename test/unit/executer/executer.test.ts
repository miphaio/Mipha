/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaExecuter } from "../../../src";

describe('Given {MiphaExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-executer');

    it('should be able to construct', async (): Promise<void> => {

        const executer = MiphaExecuter.fromScratch();

        expect(executer).to.be.instanceOf(MiphaExecuter);
    });
});

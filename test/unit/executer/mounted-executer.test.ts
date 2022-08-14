/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaMountedExecuter } from "../../../src";

describe('Given {MiphaMountedExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-mounted-executer');

    it('should be able to construct', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.mount(new Set());

        expect(mountedExecuter).to.be.instanceOf(MiphaMountedExecuter);
    });
});

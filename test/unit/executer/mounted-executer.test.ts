/**
 * @author WMXPY
 * @namespace Executer
 * @description Mounted Executer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaMountedExecuter } from "../../../src";
import { createMockTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaMountedExecuter} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('executer-mounted-executer');

    it('should be able to construct', async (): Promise<void> => {

        const mountedExecuter = MiphaMountedExecuter.mount(new Set());

        expect(mountedExecuter).to.be.instanceOf(MiphaMountedExecuter);
    });

    it('should be able to execute basic script', async (): Promise<void> => {

        const triggerModule = createMockTriggerModule();

        const mountedExecuter = MiphaMountedExecuter.mount(new Set([
            triggerModule.module,
        ]));

        await mountedExecuter.execute(
            'import {trigger} from "mock.trigger"; trigger();',
        );

        expect(triggerModule.payload).to.be.true;
    });
});

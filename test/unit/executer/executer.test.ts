/**
 * @author WMXPY
 * @namespace Executer
 * @description Executer
 * @override Unit Test
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { expect } from "chai";
import * as Chance from "chance";
import { MiphaExecuter, MiphaPermission, MiphaScript } from "../../../src";
import { createMockDefaultTriggerModule } from "../../mock/module/trigger";

describe('Given {MiphaExecuter} Class', (): void => {

    const chance: Chance.Chance = new Chance('executer-executer');

    it('should be able to construct', async (): Promise<void> => {

        const executer: MiphaExecuter = MiphaExecuter.fromScratch();

        expect(executer).to.be.instanceOf(MiphaExecuter);
    });

    it('should be able to execute pure script', async (): Promise<void> => {

        const scriptValue: number = chance.integer();
        const simpleScript: MiphaScript = MiphaScript.fromCode(
            `export default ${scriptValue};`,
        );

        const executer: MiphaExecuter = MiphaExecuter.fromScratch();
        const result: MarkedResult = await executer.mountAndExecute(simpleScript, []);

        expect(result).to.be.deep.equal({
            exports: {
                default: scriptValue,
                named: {},
            },
            signal: END_SIGNAL.SUCCEED,
        });
    });

    it('should be able to execute module mounted script', async (): Promise<void> => {

        const triggerModule = createMockDefaultTriggerModule();
        const triggerScript: MiphaScript = MiphaScript.fromCode(
            'import trigger from "mock.trigger"; trigger();',
        );

        const executer: MiphaExecuter = MiphaExecuter.fromModules(
            [triggerModule.module],
        );
        const result: MarkedResult = await executer.mountAndExecute(triggerScript, [
            MiphaPermission.fromIdentifier('mock.trigger', []),
        ]);

        expect(result.signal).to.be.equal(END_SIGNAL.SUCCEED);
        expect(triggerModule.payload).to.be.true;
    });
});
